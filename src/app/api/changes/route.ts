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

    const change = await prisma.change.create({
      data: {
        competitorId,
        snapshotId: competitorId, // placeholder relation until real snapshots exist
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


