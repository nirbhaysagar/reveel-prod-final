'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Play, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'

interface Competitor {
  id: string
  name: string
  url: string
  platform: string
  isActive: boolean
  lastScrapedAt: string | null
  createdAt: string
}

interface Change {
  id: string
  changeType: string
  oldValue: string
  newValue: string
  confidence: number
  createdAt: string
}

export default function CompetitorDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [competitor, setCompetitor] = useState<Competitor | null>(null)
  const [changes, setChanges] = useState<Change[]>([])
  const [loading, setLoading] = useState(true)
  const [scraping, setScraping] = useState(false)

  useEffect(() => {
    fetchCompetitor()
    fetchChanges()
  }, [])

  const fetchCompetitor = async () => {
    try {
      const response = await fetch(`/api/competitors/${params.id}`)
      const data = await response.json()
      setCompetitor(data.competitor)
    } catch (error) {
      console.error('Error fetching competitor:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchChanges = async () => {
    try {
      const response = await fetch(`/api/competitors/${params.id}/changes`)
      const data = await response.json()
      setChanges(data.changes || [])
    } catch (error) {
      console.error('Error fetching changes:', error)
    }
  }

  const handleScrape = async () => {
    setScraping(true)
    try {
      const response = await fetch(`/api/competitors/${params.id}/scrape`, {
        method: 'POST',
      })
      const data = await response.json()
      
      if (data.success) {
        // Refresh data
        fetchCompetitor()
        fetchChanges()
        
        // Show success message
        if (data.changes?.hasChanges) {
          alert(`Scraping complete! ${data.changes.changes.length} changes detected.`)
        } else {
          alert('Scraping complete! No changes detected.')
        }
      }
    } catch (error) {
      console.error('Error scraping:', error)
      alert('Failed to scrape competitor')
    } finally {
      setScraping(false)
    }
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'price':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      case 'content':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'product':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-slate-500" />
    }
  }

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'price':
        return 'bg-red-50 border-red-200'
      case 'content':
        return 'bg-blue-50 border-blue-200'
      case 'product':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-slate-50 border-slate-200'
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Loading competitor details...</p>
      </div>
    )
  }

  if (!competitor) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Competitor not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/competitors">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{competitor.name}</h1>
            <p className="text-slate-600 mt-1">{competitor.url}</p>
          </div>
        </div>
        <Button onClick={handleScrape} disabled={scraping}>
          <Play className="w-4 h-4 mr-2" />
          {scraping ? 'Scraping...' : 'Scrape Now'}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{changes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Last Scraped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {competitor.lastScrapedAt
                ? new Date(competitor.lastScrapedAt).toLocaleString()
                : 'Never'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                competitor.isActive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {competitor.isActive ? 'Active' : 'Inactive'}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Changes List */}
      <Card>
        <CardHeader>
          <CardTitle>Change History</CardTitle>
          <CardDescription>
            All detected changes for this competitor
          </CardDescription>
        </CardHeader>
        <CardContent>
          {changes.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No changes yet</h3>
              <p className="text-slate-500">
                Click "Scrape Now" to check for changes
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {changes.map((change) => (
                <div
                  key={change.id}
                  className={`p-4 rounded-lg border ${getChangeColor(change.changeType)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getChangeIcon(change.changeType)}
                      <span className="font-medium capitalize">{change.changeType}</span>
                      <span className="text-xs text-slate-500">
                        {(change.confidence * 100).toFixed(0)}% confident
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(change.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Old Value</p>
                      <p className="text-sm font-medium">{change.oldValue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">New Value</p>
                      <p className="text-sm font-medium">{change.newValue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
