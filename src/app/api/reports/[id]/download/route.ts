// ============================================
// DOWNLOAD REPORT API ROUTE
// ============================================
// Purpose: Download a saved report as PDF/CSV/JSON
// Why: Allow users to export reports

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Lazy import to keep edge bundle small
async function generatePdfBuffer(title: string, summary: string, keyChanges: string[], recommendations: string[]): Promise<Uint8Array> {
  const pdfLib = await import('pdf-lib')
  const { PDFDocument, StandardFonts, rgb } = pdfLib

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const fontSizeTitle = 18
  const fontSizeBody = 11

  let y = page.getHeight() - 50
  page.drawText(title, { x: 50, y, size: fontSizeTitle, font, color: rgb(0, 0, 0) })
  y -= 30

  const drawWrapped = (text: string, size: number) => {
    const maxWidth = 495
    const words = text.split(' ')
    let line = ''
    for (const word of words) {
      const testLine = line.length ? line + ' ' + word : word
      const width = font.widthOfTextAtSize(testLine, size)
      if (width > maxWidth) {
        page.drawText(line, { x: 50, y, size, font })
        y -= size + 6
        line = word
      } else {
        line = testLine
      }
    }
    if (line) {
      page.drawText(line, { x: 50, y, size, font })
      y -= size + 12
    }
  }

  // Summary
  page.drawText('Summary', { x: 50, y, size: 13, font })
  y -= 18
  drawWrapped(summary || 'N/A', fontSizeBody)

  // Key Changes
  page.drawText('Key Changes', { x: 50, y, size: 13, font })
  y -= 18
  for (const change of keyChanges || []) {
    drawWrapped('• ' + change, fontSizeBody)
  }

  // Recommendations
  page.drawText('Recommendations', { x: 50, y, size: 13, font })
  y -= 18
  for (const rec of recommendations || []) {
    drawWrapped('• ' + rec, fontSizeBody)
  }

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

function buildCsv(title: string, summary: string, keyChanges: string[], recommendations: string[]) {
  const rows: string[] = []
  const esc = (s: string) => '"' + (s || '').replace(/"/g, '""') + '"'
  rows.push('Section,Content')
  rows.push(`Title,${esc(title)}`)
  rows.push(`Summary,${esc(summary)}`)
  for (const c of keyChanges || []) rows.push(`Key Change,${esc(c)}`)
  for (const r of recommendations || []) rows.push(`Recommendation,${esc(r)}`)
  return rows.join('\n')
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const report = await prisma.report.findFirst({
      where: { id: params.id, userId: session.user.id },
    })

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    const url = new URL(request.url)
    const format = (url.searchParams.get('format') || 'pdf').toLowerCase()

    const title = report.title
    const summary = report.summary
    const insights = (report.insights as unknown as { keyChanges?: string[]; recommendations?: string[] }) || {}
    const keyChanges = Array.isArray(insights.keyChanges) ? insights.keyChanges : []
    const recommendations = Array.isArray(insights.recommendations) ? insights.recommendations : []

    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'report'

    if (format === 'json') {
      const body = JSON.stringify(report)
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${safeTitle}.json"`,
      })
      return new NextResponse(body, { status: 200, headers })
    }

    if (format === 'csv') {
      const csv = buildCsv(title, summary, keyChanges, recommendations)
      const headers = new Headers({
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${safeTitle}.csv"`,
      })
      return new NextResponse(csv, { status: 200, headers })
    }

    if (format === 'pdf') {
      const pdfBytes = await generatePdfBuffer(title, summary, keyChanges, recommendations)
      const headers = new Headers({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeTitle}.pdf"`,
      })
      return new NextResponse(Buffer.from(pdfBytes), { status: 200, headers })
    }

    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 })
  } catch (error) {
    console.error('Error downloading report:', error)
    return NextResponse.json({ error: 'Failed to download report' }, { status: 500 })
  }
}


