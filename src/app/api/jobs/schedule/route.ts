// ============================================
// SCHEDULE SCRAPING API ROUTE
// ============================================
// Purpose: Schedule all scraping jobs
// Why: Set up automatic scraping

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { scheduleScraping } from '@/services/queue'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Schedule scraping for all competitors
    await scheduleScraping()

    return NextResponse.json({ 
      success: true,
      message: 'Scraping jobs scheduled successfully'
    })
    
  } catch (error) {
    console.error('Error scheduling scraping:', error)
    return NextResponse.json(
      { error: 'Failed to schedule scraping' },
      { status: 500 }
    )
  }
}
