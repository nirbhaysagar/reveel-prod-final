'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Play, Clock, TrendingUp, TrendingDown, Sparkles } from 'lucide-react'

export default function CompetitorDetailsPage() {
  const params = useParams()
  const [scraping, setScraping] = useState(false)
  const [generatingInsight, setGeneratingInsight] = useState<string | null>(null)

  // Mock data for testing
  const competitor = {
    id: params.id,
    name: 'Nike',
    url: 'https://www.nike.com',
    platform: 'website',
    isActive: true,
    lastScrapedAt: '2025-10-22T10:30:00Z'
  }

  const changes = [
    {
      id: '1',
      type: 'price',
      oldValue: '$120.00',
      newValue: '$99.99',
      confidence: 0.95,
      createdAt: '2025-10-22T10:30:00Z',
      insight: null
    },
    {
      id: '2',
      type: 'content',
      oldValue: 'Summer Collection 2024',
      newValue: 'Fall Collection 2024',
      confidence: 0.88,
      createdAt: '2025-10-21T15:45:00Z',
      insight: 'Nike has updated their seasonal collection, indicating a shift in marketing focus towards fall/winter products.'
    },
    {
      id: '3',
      type: 'product',
      oldValue: 'Air Max 270',
      newValue: 'Air Max 280',
      confidence: 0.92,
      createdAt: '2025-10-20T09:15:00Z',
      insight: null
    }
  ]

  const handleScrape = async () => {
    setScraping(true)
    // Simulate scraping
    await new Promise(resolve => setTimeout(resolve, 3000))
    setScraping(false)
    alert('Scraping completed! Check for new changes.')
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
            <h1 className="text-3xl font-bold text-slate-900">{competitor.name}</h1>
            <p className="text-slate-600 mt-1">{competitor.url}</p>
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
              <div className="text-sm font-medium">2 hours ago</div>
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
            Recent changes detected from {competitor.name}
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
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

