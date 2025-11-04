// ============================================
// GENERATE INSIGHT API ROUTE
// ============================================
// Purpose: Generate AI insight for a specific change
// Why: Help users understand what the change means

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateChangeInsight } from '@/services/ai'

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

    // Get change
    const change = await prisma.change.findUnique({
      where: { id: params.id },
      include: {
        competitor: true,
      },
    })

    if (!change) {
      return NextResponse.json(
        { error: 'Change not found' },
        { status: 404 }
      )
    }

    if (change.competitor.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Generate insight
    const insight = await generateChangeInsight({
      competitorName: change.competitor.name,
      changeType: change.changeType,
      oldValue: change.oldValue || '',
      newValue: change.newValue || '',
      timestamp: change.createdAt.toISOString(),
    })

    return NextResponse.json({ insight })
    
  } catch (error) {
    console.error('Error generating insight:', error)
    return NextResponse.json(
      { error: 'Failed to generate insight' },
      { status: 500 }
    )
  }
}
