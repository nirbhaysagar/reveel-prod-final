// ============================================
// GENERATE REPORT API ROUTE
// ============================================
// Purpose: Generate weekly competitive intelligence report
// Why: Give users comprehensive overview of all activity

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateWeeklyReport } from '@/services/ai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get date range (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Get all competitors for this user
    const competitors = await prisma.competitor.findMany({
      where: { userId: session.user.id },
      include: {
        changes: {
          where: {
            createdAt: {
              gte: sevenDaysAgo,
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    // Format data for AI
    const competitorsData = competitors.map((comp) => ({
      competitorName: comp.name,
      changes: comp.changes.map((change) => ({
        type: change.changeType,
        oldValue: change.oldValue || '',
        newValue: change.newValue || '',
        timestamp: change.createdAt.toISOString(),
      })),
    }))

    // Generate report
    const report = await generateWeeklyReport(competitorsData)

    // Save report to database
    const savedReport = await prisma.report.create({
      data: {
        userId: session.user.id,
        title: `Weekly Report - ${new Date().toLocaleDateString()}`,
        summary: report.summary,
        insights: {
          keyChanges: report.keyChanges,
          recommendations: report.recommendations,
        },
        competitors: competitors.map((c) => c.id),
        period: 'weekly',
      },
    })

    return NextResponse.json({ report: savedReport })
    
  } catch (error) {
    console.error('Error generating report:', error)
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}
