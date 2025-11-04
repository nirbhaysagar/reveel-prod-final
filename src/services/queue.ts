// ============================================
// JOB QUEUE SERVICE - BullMQ
// ============================================
// Purpose: Manage background jobs for scraping
// Why: Run scraping tasks automatically on schedule
// Framework: BullMQ + Redis

import { Queue, Worker, Job } from 'bullmq'
import Redis from 'ioredis'
import { scrapeCompetitor } from './scraper'
import { detectChanges } from './change-detector'
import { prisma } from '@/lib/db'

// ============================================
// CHECK IF WE'RE IN BUILD MODE
// ============================================
// Only initialize workers at runtime, not during build
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.env.npm_lifecycle_event === 'build'

// ============================================
// REDIS CONNECTION
// ============================================
// What: Connect to Redis
// Why: BullMQ needs Redis to store jobs
// Note: Use lazyConnect to prevent connection during build

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  lazyConnect: true, // Don't connect immediately
  retryStrategy: isBuildTime ? () => null : undefined, // Don't retry during build
})

// Suppress connection errors during build
if (isBuildTime) {
  connection.on('error', () => {
    // Silently ignore errors during build
  })
}

// ============================================
// SCRAPING QUEUE
// ============================================
// What: Queue for scraping jobs
// Why: Manage all scraping tasks

export const scrapingQueue = new Queue('scraping', { connection })

// ============================================
// SCRAPING WORKER
// ============================================
// What: Worker that processes scraping jobs
// Why: Actually executes the scraping tasks
// Note: Worker is only used in separate worker process, not in Next.js build

// Always create worker (worker.ts needs it), but it won't connect during build
export const scrapingWorker = new Worker(
  'scraping',
  async (job: Job) => {
    const { competitorId } = job.data
    
    console.log(`Starting scrape job for competitor: ${competitorId}`)
    
    try {
      // ============================================
      // GET COMPETITOR
      // ============================================
      const competitor = await prisma.competitor.findUnique({
        where: { id: competitorId },
      })

      if (!competitor) {
        throw new Error('Competitor not found')
      }

      if (!competitor.isActive) {
        console.log(`Competitor ${competitorId} is inactive, skipping`)
        return
      }

      // ============================================
      // SCRAPE WEBSITE
      // ============================================
      const scrapedData = await scrapeCompetitor(
        competitor.url,
        competitor.targetSelector || undefined
      )

      // ============================================
      // SAVE SNAPSHOT
      // ============================================
      const snapshot = await prisma.snapshot.create({
        data: {
          competitorId: competitor.id,
          html: scrapedData.html,
          screenshot: scrapedData.screenshot,
          extractedData: scrapedData.extractData,
          detectedText: typeof scrapedData.extractData === 'string' ? scrapedData.extractData : JSON.stringify(scrapedData.extractData || ''),
        },
      })

      // ============================================
      // GET PREVIOUS SNAPSHOT
      // ============================================
      const previousSnapshot = await prisma.snapshot.findFirst({
        where: { competitorId: competitor.id },
        orderBy: { createdAt: 'desc' },
        skip: 1,
      })

      // ============================================
      // DETECT CHANGES
      // ============================================
      if (previousSnapshot) {
        await detectChanges(
          competitor.id,
          previousSnapshot.id,
          snapshot.id
        )
      }

      // ============================================
      // UPDATE COMPETITOR
      // ============================================
      await prisma.competitor.update({
        where: { id: competitor.id },
        data: { lastScrapedAt: new Date() },
      })

      console.log(`Successfully scraped competitor: ${competitorId}`)
      
      return { success: true, snapshotId: snapshot.id }
      
    } catch (error) {
      console.error(`Error scraping competitor ${competitorId}:`, error)
      throw error
    }
  },
  { 
    connection,
    limiter: {
      max: 10, // Max 10 jobs at a time
      duration: 1000, // Per 1 second
    },
  }
)

// ============================================
// JOB EVENT HANDLERS
// ============================================
// What: Handle job events
// Why: Monitor job progress and errors

scrapingWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`)
})

scrapingWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err)
})

scrapingWorker.on('error', (err) => {
  // Suppress errors during build to reduce noise
  if (!isBuildTime) {
    console.error('Worker error:', err)
  }
  // During build, silently ignore connection errors
})

// ============================================
// SCHEDULE SCRAPING
// ============================================
// What: Schedule scraping jobs for all competitors
// Why: Automatically scrape on schedule

export async function scheduleScraping() {
  console.log('Scheduling scraping jobs...')
  
  // Get all active competitors
  const competitors = await prisma.competitor.findMany({
    where: { isActive: true },
  })

  for (const competitor of competitors) {
    // Remove existing job for this competitor (if any)
    await scrapingQueue.remove(competitor.id)
    
    // Add new recurring job
    await scrapingQueue.add(
      `scrape-${competitor.id}`,
      { competitorId: competitor.id },
      {
        jobId: competitor.id, // Unique job ID
        repeat: {
          every: competitor.scrapeInterval * 60 * 60 * 1000, // Convert hours to milliseconds
        },
      }
    )
    
    console.log(`Scheduled scraping for ${competitor.name} every ${competitor.scrapeInterval} hours`)
  }
  
  console.log(`Scheduled ${competitors.length} scraping jobs`)
}

// ============================================
// MANUAL SCRAPE JOB
// ============================================
// What: Add a one-time scraping job
// Why: Allow manual triggers

export async function addScrapeJob(competitorId: string) {
  const job = await scrapingQueue.add(
    `manual-scrape-${competitorId}`,
    { competitorId },
    {
      jobId: `manual-${competitorId}-${Date.now()}`,
    }
  )
  
  return job
}

// ============================================
// GET JOB STATUS
// ============================================
// What: Check status of a job
// Why: Monitor job progress

export async function getJobStatus(jobId: string) {
  const job = await scrapingQueue.getJob(jobId)
  
  if (!job) {
    return null
  }
  
  const state = await job.getState()
  
  return {
    id: job.id,
    name: job.name,
    state,
    progress: job.progress,
    data: job.data,
    returnvalue: job.returnvalue,
    failedReason: job.failedReason,
    timestamp: job.timestamp,
  }
}

// ============================================
// GET ALL JOBS
// ============================================
// What: Get all jobs in queue
// Why: Monitor all scraping activity

export async function getAllJobs() {
  const jobs = await scrapingQueue.getJobs(['waiting', 'active', 'completed', 'failed'])
  
  return Promise.all(
    jobs.map(async (job) => ({
      id: job.id,
      name: job.name,
      state: await job.getState(),
      progress: job.progress,
      data: job.data,
    }))
  )
}

// ============================================
// CLEANUP
// ============================================
// What: Close connections
// Why: Clean shutdown

export async function closeQueue() {
  await scrapingWorker.close()
  await scrapingQueue.close()
  await connection.quit()
}
