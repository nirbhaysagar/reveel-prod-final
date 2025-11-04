// ============================================
// SCRAPE COMPETITOR API ROUTE
// ============================================
// Purpose: Manually trigger scraping for a competitor
// Why: Allow users to scrape on demand

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { addScrapeJob } from '@/services/queue'
import { checkRateLimitAsync, RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
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
      `scrape:${userId}`,
      RATE_LIMITS.scraping.maxRequests,
      RATE_LIMITS.scraping.windowMs
    )

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
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

    // Get competitor
    const { id } = await context.params
    const competitor = await prisma.competitor.findUnique({
      where: { id },
    })

    if (!competitor) {
      return NextResponse.json(
        { error: 'Competitor not found' },
        { status: 404 }
      )
    }

    if (competitor.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // ============================================
    // ENQUEUE SCRAPE JOB (BACKGROUND)
    // ============================================
    const job = await addScrapeJob(competitor.id)

    return NextResponse.json(
      {
        success: true,
        accepted: true,
        jobId: job.id,
        message: 'Scrape job enqueued. Poll job status to track progress.'
      },
      { status: 202 }
    )
    
  } catch (error) {
    console.error('Error scraping competitor:', error)
    return NextResponse.json(
      { error: 'Failed to scrape competitor' },
      { status: 500 }
    )
  }
}
