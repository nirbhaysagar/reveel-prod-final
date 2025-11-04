import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { FileText, Sparkles, TrendingUp, Lightbulb } from 'lucide-react'

export default async function InsightsPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }

  // Fetch latest report for this user (if any)
  const latestReport = await prisma.report.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  // Fetch recent changes across competitors for this user
  const recentChanges = await prisma.change.findMany({
    where: { competitor: { userId: session.user.id } },
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { competitor: true },
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Insights</h1>
          <p className="text-slate-600 mt-1">Latest insights generated from your tracked competitors</p>
        </div>
        <form action="/dashboard/insights" method="post">
          <Button formAction="/api/reports/generate">
            <Sparkles className="w-4 h-4 mr-2" /> Generate Weekly Report
          </Button>
        </form>
      </div>

      {latestReport ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2"><FileText className="w-5 h-5" /> {latestReport.title}</h2>
            <p className="text-slate-700 mt-2 whitespace-pre-line">{latestReport.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Key Changes</h3>
              <ul className="mt-3 space-y-2">
                {(latestReport.insights as any)?.keyChanges?.map((c: string, i: number) => (
                  <li key={i} className="text-slate-700">• {c}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5" /> Recommendations</h3>
              <ul className="mt-3 space-y-2">
                {(latestReport.insights as any)?.recommendations?.map((r: string, i: number) => (
                  <li key={i} className="text-slate-700">• {r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border p-8 text-center">
          <p className="text-slate-700 mb-4">No reports yet. Generate your first weekly report to see insights here.</p>
          <form action="/dashboard/insights" method="post">
            <Button formAction="/api/reports/generate">
              <Sparkles className="w-4 h-4 mr-2" /> Generate Weekly Report
            </Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold">Recent Changes</h3>
        <ul className="mt-3 space-y-2">
          {recentChanges.map((ch) => (
            <li key={ch.id} className="text-slate-700">
              [{new Date(ch.createdAt).toLocaleString()}] {ch.competitor.name}: {ch.changeType}
            </li>
          ))}
          {recentChanges.length === 0 && <li className="text-slate-500">No recent changes.</li>}
        </ul>
      </div>
    </div>
  )
}

