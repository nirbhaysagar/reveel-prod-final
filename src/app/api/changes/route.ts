import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { competitorId, changeType, oldValue, newValue, confidence } = body

    if (!competitorId || !changeType) {
      return NextResponse.json({ error: 'competitorId and changeType are required' }, { status: 400 })
    }

    // Ensure competitor belongs to user
    const competitor = await prisma.competitor.findFirst({
      where: { id: competitorId, userId: session.user.id },
      select: { id: true },
    })
    if (!competitor) {
      return NextResponse.json({ error: 'Competitor not found' }, { status: 404 })
    }

    // Find the most recent snapshot for this competitor
    const latestSnapshot = await prisma.snapshot.findFirst({
      where: { competitorId },
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    })

    if (!latestSnapshot) {
      return NextResponse.json({ error: 'No snapshot found for competitor' }, { status: 400 })
    }

    const change = await prisma.change.create({
      data: {
        competitorId,
        snapshotId: latestSnapshot.id,
        changeType,
        oldValue: oldValue ?? null,
        newValue: newValue ?? null,
        confidence: typeof confidence === 'number' ? confidence : 1.0,
      },
    })

    return NextResponse.json({ change }, { status: 201 })
  } catch (error) {
    console.error('Error creating change:', error)
    return NextResponse.json({ error: 'Failed to create change' }, { status: 500 })
  }
}


