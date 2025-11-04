// ============================================
// GET NOTIFICATIONS API ROUTE
// ============================================
// Purpose: Get all notifications for user
// Why: Display in dashboard

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserNotifications } from '@/services/notifications'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const notifications = await getUserNotifications(session.user.id)

    return NextResponse.json({ notifications })
    
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
