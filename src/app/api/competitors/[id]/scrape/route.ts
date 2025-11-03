// ============================================
// SCRAPE COMPETITOR API ROUTE
// ============================================
// Purpose: Manually trigger scraping for a competitor
// Why: Allow users to scrape on demand

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { scrapeCompetitor } from '@/services/scraper'
import { detectChanges } from '@/services/change-detector'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
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
    const rateLimitResult = checkRateLimit(
      `scrape:${session.user.id}`,
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
    const competitor = await prisma.competitor.findUnique({
      where: { id: params.id },
    })

    if (!competitor) {
      return NextResponse.json(
        { error: 'Competitor not found' },
        { status: 404 }
      )
    }

    if (competitor.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // ============================================
    // SCRAPE THE WEBSITE
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
        extractedData: scrapedData.extractedData,
        detectedText: scrapedData.extractedData as string,
      },
    })

    // ============================================
    // GET PREVIOUS SNAPSHOT
    // ============================================
    const previousSnapshot = await prisma.snapshot.findFirst({
      where: { competitorId: competitor.id },
      orderBy: { createdAt: 'desc' },
      skip: 1, // Skip the one we just created
    })

    // ============================================
    // DETECT CHANGES
    // ============================================
    let changeResult = null
    if (previousSnapshot) {
      changeResult = await detectChanges(
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

    return NextResponse.json({
      success: true,
      snapshot,
      changes: changeResult,
    })
    
  } catch (error) {
    console.error('Error scraping competitor:', error)
    return NextResponse.json(
      { error: 'Failed to scrape competitor' },
      { status: 500 }
    )
  }
}
