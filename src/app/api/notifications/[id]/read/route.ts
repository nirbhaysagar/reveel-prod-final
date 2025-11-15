import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { markNotificationAsRead } from '@/services/notifications'

export async function PATCH(
  request: Request,
  context: { params: Promise<Record<string, string>> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session as any)?.user?.id as string
    const { id } = await context.params
    const notif = await prisma.notification.findFirst({
      where: { id, userId },
      select: { id: true },
    })
    if (!notif) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to mark read' }, { status: 500 })
  }
}

// ============================================
// MARK NOTIFICATION AS READ API ROUTE
// ============================================
// Purpose: Mark notification as read
// Why: Track which notifications user has seen

export async function POST(
  request: Request,
  context: { params: Promise<Record<string, string>> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await context.params
    await markNotificationAsRead(id)

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark notification as read' },
      { status: 500 }
    )
  }
}
