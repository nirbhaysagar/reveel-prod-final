// ============================================
// QUICK SCAN API ROUTE
// ============================================
// Purpose: Trigger immediate scraping for all active competitors
// Why: Allow users to quickly scan all competitors at once

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { addScrapeJob } from '@/services/queue'
import { checkRateLimitAsync, RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ============================================
    // RATE LIMITING
    // ============================================
    const userId = (session as any)?.user?.id as string
    const rateLimitResult = await checkRateLimitAsync(
      `quick-scan:${userId}`,
      RATE_LIMITS.scraping.maxRequests,
      RATE_LIMITS.scraping.windowMs
    )

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please wait before scanning again.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Get all active competitors for this user
    const competitors = await prisma.competitor.findMany({
      where: { 
        userId,
        isActive: true 
      },
    })

    if (competitors.length === 0) {
      return NextResponse.json(
        { 
          error: 'No active competitors found. Add competitors first.',
          count: 0
        },
        { status: 400 }
      )
    }

    // Add scrape jobs for all competitors
    const jobs = []
    let redisError = false
    
    for (const competitor of competitors) {
      try {
        const job = await addScrapeJob(competitor.id)
        jobs.push({ competitorId: competitor.id, competitorName: competitor.name, jobId: job.id })
      } catch (error: any) {
        console.error(`Failed to queue scrape job for ${competitor.name}:`, error)
        // Check if it's a Redis configuration error
        if (error?.message?.includes('Redis is not configured')) {
          redisError = true
        }
        // Continue with other competitors even if one fails
      }
    }

    // If Redis is not configured, return a helpful error
    if (redisError && jobs.length === 0) {
      return NextResponse.json(
        { 
          error: 'Redis is not configured. Background jobs require Redis. Please set REDIS_URL in your environment variables. Quick scan will work once Redis is configured.',
          hint: 'Get a free Redis instance from Upstash (https://upstash.com) or Redis Cloud'
        },
        { status: 503 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: `Quick scan initiated for ${jobs.length} competitor${jobs.length !== 1 ? 's' : ''}`,
      count: jobs.length,
      jobs: jobs
    })
    
  } catch (error) {
    console.error('Error initiating quick scan:', error)
    return NextResponse.json(
      { error: 'Failed to initiate quick scan' },
      { status: 500 }
    )
  }
}

