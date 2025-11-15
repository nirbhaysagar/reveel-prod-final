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

function extractPrice(data: any): number | null {
  if (!data) return null

  const text = typeof data === 'string' ? data : JSON.stringify(data)
  
  const pricePatterns = [
    /\$\s?(\d+(?:[.,]\d{2})?)/,
    /(?:price|cost|value)[\s:=]*\$?(\d+(?:[.,]\d{2})?)/i,
    /(\d+(?:[.,]\d{2})?)\s*(?:USD|dollars?|\$)/i,
    /^[\s$]*(\d+(?:[.,]\d{2})?)[\s$]*$/,
  ]

  for (const pattern of pricePatterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      const priceStr = match[1].replace(/,/g, '.')
      const price = parseFloat(priceStr)
      if (!isNaN(price) && price > 0) {
        return price
      }
    }
  }

  return null
}

// ============================================
// CHECK IF WE'RE IN BUILD MODE
// ============================================
// Only initialize workers at runtime, not during build
// Vercel sets VERCEL=1 during runtime, so if it's production but no VERCEL, it's likely build
const isBuildTime = typeof window === 'undefined' && (
  process.env.NEXT_PHASE === 'phase-production-build' || 
  process.env.npm_lifecycle_event === 'build' ||
  (process.env.NODE_ENV === 'production' && !process.env.VERCEL && !process.env.REDIS_URL)
)

// ============================================
// REDIS CONNECTION (LAZY)
// ============================================
// What: Connect to Redis
// Why: BullMQ needs Redis to store jobs
// Note: Use lazyConnect to prevent connection during build

let connection: Redis | null = null
let _scrapingQueue: Queue | null = null
let _scrapingWorker: Worker | null = null

function getRedisConnection(): Redis | null {
  if (connection) return connection
  
  const redisUrl = process.env.REDIS_URL
  // Don't try to connect if REDIS_URL is missing or invalid
  if (!redisUrl || redisUrl.trim() === '' || redisUrl === '/') {
    return null
  }
  
  try {
    connection = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      lazyConnect: true, // Don't connect immediately
      enableOfflineQueue: false, // Don't queue commands if not connected
      retryStrategy: () => null, // Don't retry on connection failure
    })

    // Handle connection errors gracefully
    connection.on('error', (err) => {
      // Only log if it's a real error (not just missing Redis)
      if (err.message && !err.message.includes('ENOTSOCK')) {
        console.error('Redis connection error:', err.message)
      }
      // Don't spam errors - connection will be null and operations will fail gracefully
    })
  } catch (error) {
    // If Redis URL is invalid, return null
    return null
  }
  
  return connection
}

function getQueue(): Queue | null {
  if (_scrapingQueue) return _scrapingQueue
  
  // During build, don't create queue at all - return a mock
  // This prevents any Redis connection attempts
  if (isBuildTime) {
    // Return a minimal mock that satisfies the Queue interface
    // This will only be used during build-time analysis
    _scrapingQueue = {
      add: async () => ({ id: 'build-mock' } as any),
      remove: async () => {},
      getJob: async () => null,
      getJobs: async () => [],
      close: async () => {},
    } as unknown as Queue
    
    return _scrapingQueue
  }
  
  // If Redis is not available, return null
  const redis = getRedisConnection()
  if (!redis) {
    return null
  }
  
  _scrapingQueue = new Queue('scraping', { 
    connection: getRedisConnection(),
  })
  
  return _scrapingQueue
}

function getWorker(): Worker {
  if (_scrapingWorker) return _scrapingWorker
  
  // During build, don't create worker at all - return a mock
  // This prevents any Redis connection attempts
  if (isBuildTime) {
    // Return a minimal mock that satisfies the Worker interface
    _scrapingWorker = {
      on: () => {},
      close: async () => {},
    } as unknown as Worker
    
    return _scrapingWorker
  }
  
  _scrapingWorker = new Worker(
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
      const detectedText = typeof scrapedData.extractData === 'string' 
        ? scrapedData.extractData 
        : JSON.stringify(scrapedData.extractData || '')
      
      const detectedPrice = extractPrice(detectedText) || extractPrice(scrapedData.extractData)

      const snapshot = await prisma.snapshot.create({
        data: {
          competitorId: competitor.id,
          html: scrapedData.html,
          screenshot: scrapedData.screenshot,
          extractedData: scrapedData.extractData,
          detectedText: detectedText,
          detectedPrice: detectedPrice,
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
    connection: getRedisConnection(),
    limiter: {
      max: 10, // Max 10 jobs at a time
      duration: 1000, // Per 1 second
    },
  })
  
  // Only set up event handlers at runtime
  if (!isBuildTime) {
    _scrapingWorker.on('completed', (job) => {
      console.log(`Job ${job.id} completed successfully`)
    })

    _scrapingWorker.on('failed', (job, err) => {
      console.error(`Job ${job?.id} failed:`, err)
    })

    _scrapingWorker.on('error', (err) => {
      console.error('Worker error:', err)
    })
  }
  
  return _scrapingWorker
}

// Export queue and worker - lazy initialization
// These will be created when first accessed, not at module load
// During build, isBuildTime is true so they won't connect to Redis
// Note: scrapingQueue can be null if Redis is not configured
export const scrapingQueue: Queue | null = getQueue()
export const scrapingWorker = getWorker()

// ============================================
// SCHEDULE SCRAPING
// ============================================
// What: Schedule scraping jobs for all competitors
// Why: Automatically scrape on schedule

export async function scheduleScraping() {
  if (isBuildTime) {
    console.log('Skipping scraping schedule during build')
    return
  }
  
  const queue = getQueue()
  if (!queue) {
    console.warn('Redis is not configured. Cannot schedule scraping jobs.')
    return
  }
  
  console.log('Scheduling scraping jobs...')
  
  // Get all active competitors
  const competitors = await prisma.competitor.findMany({
    where: { isActive: true },
  })

  for (const competitor of competitors) {
    // Remove existing job for this competitor (if any)
    await queue.remove(competitor.id)
    
    // Add new recurring job
    await queue.add(
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
  if (isBuildTime) {
    throw new Error('Cannot add scrape jobs during build')
  }
  
  const queue = getQueue()
  if (!queue) {
    throw new Error('Redis is not configured. Please set REDIS_URL in your environment variables to use background jobs.')
  }
  
  const job = await queue.add(
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
  if (isBuildTime) {
    return null
  }
  
  const queue = getQueue()
  if (!queue) {
    return null
  }
  
  const job = await queue.getJob(jobId)
  
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
  if (isBuildTime) {
    return []
  }
  
  const queue = getQueue()
  if (!queue) {
    return []
  }
  
  const jobs = await queue.getJobs(['waiting', 'active', 'completed', 'failed'])
  
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
  if (_scrapingWorker) {
    await _scrapingWorker.close()
  }
  if (_scrapingQueue) {
    await _scrapingQueue.close()
  }
  if (connection) {
    await connection.quit()
  }
}
