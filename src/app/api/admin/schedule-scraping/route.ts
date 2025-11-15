import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { scheduleScraping } from '@/services/queue'

// TEMPORARY ADMIN ENDPOINT
// POST /api/admin/schedule-scraping
// Restricted to a specific admin email; remove after running once per env.

const ADMIN_EMAIL = 'nirbhaysagar45@gmail.com'

export async function POST(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await scheduleScraping()
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('schedule-scraping error', e)
    return NextResponse.json({ error: 'Failed to schedule scraping' }, { status: 500 })
  }
}


