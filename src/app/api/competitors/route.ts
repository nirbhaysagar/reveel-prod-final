// ============================================
// COMPETITORS API ROUTE
// ============================================
// Purpose: Handle competitor CRUD operations
// Why: Manage competitors from the frontend

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { 
  validateUrl, 
  validateCompetitorName, 
  validateCssSelector, 
  validateScrapeInterval,
  sanitizeString 
} from '@/lib/validation'

// ============================================
// GET - LIST ALL COMPETITORS
// ============================================
// What: Get all competitors for the logged-in user
// Why: Display competitor list in UI
export async function GET(request: NextRequest) {
  try {
    // Get current user session
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Find all competitors for this user
    const competitors = await prisma.competitor.findMany({
      where: { 
        userId: session.user.id 
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ competitors })
    
  } catch (error) {
    console.error('Error fetching competitors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch competitors' },
      { status: 500 }
    )
  }
}

// ============================================
// POST - CREATE NEW COMPETITOR
// ============================================
// What: Create a new competitor
// Why: Add new competitor to track
export async function POST(request: NextRequest) {
  try {
    // Get current user session
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await request.json()
    const { name, url, platform, targetSelector, scrapeInterval } = body

    // ============================================
    // INPUT VALIDATION
    // ============================================
    
    // Validate name
    const nameValidation = validateCompetitorName(name)
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      )
    }
    
    // Validate URL
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }
    
    const urlValidation = validateUrl(url)
    if (!urlValidation.valid) {
      return NextResponse.json(
        { error: urlValidation.error },
        { status: 400 }
      )
    }
    
    // Validate CSS selector
    if (targetSelector) {
      const selectorValidation = validateCssSelector(targetSelector)
      if (!selectorValidation.valid) {
        return NextResponse.json(
          { error: selectorValidation.error },
          { status: 400 }
        )
      }
    }
    
    // Validate scrape interval
    const interval = parseInt(scrapeInterval) || 24
    const intervalValidation = validateScrapeInterval(interval)
    if (!intervalValidation.valid) {
      return NextResponse.json(
        { error: intervalValidation.error },
        { status: 400 }
      )
    }
    
    // Validate platform
    const validPlatforms = ['website', 'instagram', 'facebook', 'linkedin']
    const safePlatform = validPlatforms.includes(platform) ? platform : 'website'

    // ============================================
    // SANITIZE INPUTS
    // ============================================
    const sanitizedName = sanitizeString(name, 100)
    const sanitizedSelector = targetSelector ? sanitizeString(targetSelector, 500) : null

    // Create competitor
    const competitor = await prisma.competitor.create({
      data: {
        name: sanitizedName,
        url: url.trim(),
        platform: safePlatform,
        targetSelector: sanitizedSelector,
        scrapeInterval: interval,
        userId: session.user.id,
      },
    })

    return NextResponse.json(
      { competitor },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Error creating competitor:', error)
    return NextResponse.json(
      { error: 'Failed to create competitor' },
      { status: 500 }
    )
  }
}
