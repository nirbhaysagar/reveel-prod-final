import { prisma } from '@/lib/db'
import { formatDistanceToNow } from 'date-fns'

export default async function DashboardPage() {
  const [competitorsCount, changesCount, reportsCount, recentChanges] = await Promise.all([
    prisma.competitor.count(),
    prisma.change.count(),
    prisma.report.count(),
    prisma.change.findMany({ include: { competitor: true }, orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  const activeJobs = 0

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
          Dashboard
        </h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
          Live view of your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-blue-500 rounded-lg"></div>
            </div>
            <div className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">live</div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Total Competitors</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{competitorsCount}</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>from your workspace</p>
        </div>

        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-orange-500 rounded-lg"></div>
            </div>
            <div className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">live</div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Changes Detected</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{changesCount}</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>total changes stored</p>
        </div>

        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
            </div>
            <div className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">live</div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>AI Insights</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{reportsCount}</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>reports generated</p>
        </div>

        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
            </div>
            <div className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">live</div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Active Jobs</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>{activeJobs}</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>requires Redis worker</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Recent Activity</h2>
              <p className="text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Latest changes detected across your competitors
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          {recentChanges.length === 0 ? (
            <p className="text-gray-500">No changes yet. Add a competitor to get started.</p>
          ) : (
            <div className="space-y-6">
              {recentChanges.map((c) => (
                <div key={c.id} className="group flex items-center justify-between py-4 px-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-6"></div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-900 group-hover:text-gray-700" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                        {c.competitor?.name || 'Competitor'} change: {c.changeType}
                      </p>
                      <p className="text-sm text-gray-500 font-light mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                        {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

