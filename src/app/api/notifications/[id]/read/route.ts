// ============================================
// MARK NOTIFICATION AS READ API ROUTE
// ============================================
// Purpose: Mark notification as read
// Why: Track which notifications user has seen

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { markNotificationAsRead } from '@/services/notifications'

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

    await markNotificationAsRead(params.id)

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark notification as read' },
      { status: 500 }
    )
  }
}
