'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Play, Clock, TrendingUp, TrendingDown, Sparkles } from 'lucide-react'

export default function CompetitorDetailsPage() {
  const params = useParams()
  const [scraping, setScraping] = useState(false)
  const [generatingInsight, setGeneratingInsight] = useState<string | null>(null)
  const [competitor, setCompetitor] = useState<{ id: string; name: string; url: string } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/competitors/${params.id}`, { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        setCompetitor({ id: data.competitor.id, name: data.competitor.name, url: data.competitor.url })
      } catch {}
    }
    load()
  }, [params.id])

  // No mock changes; will remain empty until scraping/DB is wired
  const changes: Array<{
    id: string
    type: string
    oldValue?: string | null
    newValue?: string | null
    confidence: number
    createdAt?: string
    insight?: string | null
  }> = []

  const handleScrape = async () => {
    try {
      setScraping(true)
      const id = competitor?.id || String(params.id)
      const res = await fetch(`/api/competitors/${id}/scrape`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        alert(data?.error || 'Failed to enqueue scrape')
      } else {
        alert('Scrape job enqueued. You can continue working while it runs.')
      }
    } catch (e) {
      alert('Failed to enqueue scrape')
    } finally {
      setScraping(false)
    }
  }

  const handleLogTestChange = async () => {
    try {
      await fetch('/api/changes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorId: competitor?.id || String(params.id),
          changeType: 'content',
          oldValue: 'Old value',
          newValue: 'New value',
          confidence: 0.95,
        }),
      })
      alert('Test change logged. Check Recent Activity on the dashboard.')
    } catch (e) {
      alert('Failed to log change')
    }
  }

  const handleGenerateInsight = async (changeId: string) => {
    setGeneratingInsight(changeId)
    // Simulate AI insight generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratingInsight(null)
    alert('AI insight generated!')
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'price': return TrendingDown
      case 'content': return TrendingUp
      case 'product': return Sparkles
      default: return TrendingUp
    }
  }

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'price': return 'text-red-600 bg-red-50'
      case 'content': return 'text-blue-600 bg-blue-50'
      case 'product': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{competitor?.name ?? String(params.id)}</h1>
            {competitor?.url && <p className="text-slate-600 mt-1">{competitor.url}</p>}
          </div>
        </div>
        <Button 
          onClick={handleScrape} 
          disabled={scraping}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {scraping ? 'Scraping...' : 'Scrape Now'}
        </Button>
        <Button 
          variant="outline"
          onClick={handleLogTestChange}
          className="ml-2"
        >
          Log test change
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Total Changes</h3>
              <div className="text-2xl font-bold">{changes.length}</div>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Last Scraped</h3>
              <div className="text-sm font-medium">Not available</div>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Status</h3>
              <div className="text-sm font-medium text-green-600">Active</div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Changes List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Change History</h2>
          <p className="text-sm text-slate-600 mt-1">
            Recent changes detected from {competitor?.name ?? String(params.id)}
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {changes.length === 0 && (
              <div className="text-slate-600">No changes yet. Add this competitor and run a scrape.</div>
            )}
            {changes.map((change) => {
              const Icon = getChangeIcon(change.type)
              const colorClass = getChangeColor(change.type)
              
              return (
                <div key={change.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 capitalize">{change.type} Change</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {Math.round(change.confidence * 100)}% confidence
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        <span className="line-through">{change.oldValue}</span> → <span className="font-medium">{change.newValue}</span>
                      </div>
                      {change.insight && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">{change.insight}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">
                      {new Date(change.createdAt).toLocaleDateString()}
                    </span>
                    {!change.insight && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateInsight(change.id)}
                        disabled={generatingInsight === change.id}
                        className="flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        {generatingInsight === change.id ? 'Generating...' : 'AI Insight'}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

