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

    const userId = (session as any)?.user?.id as string
    if (competitor.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Get changes
    const changes = await prisma.change.findMany({
      where: { competitorId: id },
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
