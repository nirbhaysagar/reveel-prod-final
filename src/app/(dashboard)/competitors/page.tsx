'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Globe, Instagram, Facebook, Linkedin } from 'lucide-react'
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

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompetitors()
  }, [])

  const fetchCompetitors = async () => {
    try {
      const response = await fetch('/api/competitors')
      const data = await response.json()
      setCompetitors(data.competitors || [])
    } catch (error) {
      console.error('Error fetching competitors:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'facebook':
        return <Facebook className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      default:
        return <Globe className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Competitors</h1>
          <p className="text-slate-600 mt-1">
            Manage and track your competitors
          </p>
        </div>
        <Link href="/dashboard/competitors/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Competitor
          </Button>
        </Link>
      </div>

      {/* Competitors Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-500">Loading competitors...</p>
        </div>
      ) : competitors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Globe className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No competitors yet</h3>
            <p className="text-slate-500 mb-4">
              Start tracking your competitors by adding your first one
            </p>
            <Link href="/dashboard/competitors/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Competitor
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((competitor) => (
            <Card key={competitor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      {getPlatformIcon(competitor.platform)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{competitor.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {competitor.platform}
                      </CardDescription>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      competitor.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {competitor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">URL</p>
                    <p className="text-sm text-slate-700 truncate">{competitor.url}</p>
                  </div>
                  
                  {competitor.lastScrapedAt && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Last Scraped</p>
                      <p className="text-sm text-slate-700">
                        {new Date(competitor.lastScrapedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Link href={`/dashboard/competitors/${competitor.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/dashboard/competitors/${competitor.id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
