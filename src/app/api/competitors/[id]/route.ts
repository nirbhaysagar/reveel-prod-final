// ============================================
// COMPETITOR BY ID API ROUTE
// ============================================
// Purpose: Handle individual competitor operations
// Why: Update or delete specific competitor

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// ============================================
// GET - GET SINGLE COMPETITOR
// ============================================
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

    return NextResponse.json({ competitor })
    
  } catch (error) {
    console.error('Error fetching competitor:', error)
    return NextResponse.json(
      { error: 'Failed to fetch competitor' },
      { status: 500 }
    )
  }
}

// ============================================
// PUT - UPDATE COMPETITOR
// ============================================
export async function PUT(
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

    const body = await request.json()
    const { name, url, platform, targetSelector, scrapeInterval, isActive } = body

    // Check if competitor exists and user owns it
    const existing = await prisma.competitor.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Competitor not found' },
        { status: 404 }
      )
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Update competitor
    const competitor = await prisma.competitor.update({
      where: { id: params.id },
      data: {
        name,
        url,
        platform,
        targetSelector,
        scrapeInterval,
        isActive,
      },
    })

    return NextResponse.json({ competitor })
    
  } catch (error) {
    console.error('Error updating competitor:', error)
    return NextResponse.json(
      { error: 'Failed to update competitor' },
      { status: 500 }
    )
  }
}

// ============================================
// DELETE - DELETE COMPETITOR
// ============================================
export async function DELETE(
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

    // Check if competitor exists and user owns it
    const existing = await prisma.competitor.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Competitor not found' },
        { status: 404 }
      )
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Delete competitor (cascades to snapshots and changes)
    await prisma.competitor.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error deleting competitor:', error)
    return NextResponse.json(
      { error: 'Failed to delete competitor' },
      { status: 500 }
    )
  }
}