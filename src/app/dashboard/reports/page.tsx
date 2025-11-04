import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const [reports, totalReports, totalChanges] = await Promise.all([
    prisma.report.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.report.count({ where: { userId: session.user.id } }),
    prisma.change.count({ where: { competitor: { userId: session.user.id } } }),
  ])

  const aiInsightsCount = reports.reduce((acc, r) => acc + ((r.insights as any)?.keyChanges?.length || 0), 0)

  const downloadHref = (id: string, format: 'pdf'|'csv'|'json' = 'pdf') => `/api/reports/${id}/download?format=${format}`

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-1">Your AI-generated competitive intelligence reports</p>
        </div>
        {reports[0] && (
          <a href={downloadHref(reports[0].id, 'pdf')}>
            <Button>
              <Download className="w-4 h-4 mr-2" /> Export Latest (PDF)
            </Button>
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="text-sm text-slate-600 mb-2">Total Reports</h3>
          <div className="text-3xl font-semibold">{totalReports}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="text-sm text-slate-600 mb-2">Changes Tracked</h3>
          <div className="text-3xl font-semibold">{totalChanges}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="text-sm text-slate-600 mb-2">AI Insights</h3>
          <div className="text-3xl font-semibold">{aiInsightsCount}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="text-sm text-slate-600 mb-2">Last Generated</h3>
          <div className="text-3xl font-semibold">{reports[0] ? new Date(reports[0].createdAt).toLocaleDateString() : '-'}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Reports</h2>
          <p className="text-sm text-slate-600">Your latest competitive intelligence reports</p>
        </div>
        <div className="p-6">
          {reports.length === 0 && <p className="text-slate-600">No reports yet. Generate one from the Insights page.</p>}
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 rounded-xl border hover:bg-slate-50">
                <div>
                  <div className="font-medium text-slate-900">{r.title}</div>
                  <div className="text-sm text-slate-600">{new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <a href={downloadHref(r.id, 'pdf')}><Button variant="ghost"><Download className="w-4 h-4 mr-2" /> PDF</Button></a>
                  <a href={downloadHref(r.id, 'csv')}><Button variant="ghost">CSV</Button></a>
                  <a href={downloadHref(r.id, 'json')}><Button variant="ghost">JSON</Button></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

