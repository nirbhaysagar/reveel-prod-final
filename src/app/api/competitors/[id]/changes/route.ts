// ============================================
// GET CHANGES API ROUTE
// ============================================
// Purpose: Get all changes for a competitor
// Why: Display change history in UI

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
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

    // Get changes
    const changes = await prisma.change.findMany({
      where: { competitorId: params.id },
      orderBy: { createdAt: 'desc' },
      take: 50, // Limit to 50 most recent changes
    })

    return NextResponse.json({ changes })
    
  } catch (error) {
    console.error('Error fetching changes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch changes' },
      { status: 500 }
    )
  }
}
