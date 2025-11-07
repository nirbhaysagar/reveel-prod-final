'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Competitor {
  id: string
  name: string
  url: string
  platform: string
  isActive: boolean
  targetSelector?: string
  scrapeInterval: number
}

export default function EditCompetitorPage() {
  const params = useParams()
  const router = useRouter()
  const [competitor, setCompetitor] = useState<Competitor | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    platform: 'website',
    isActive: true,
    targetSelector: '',
    scrapeInterval: 24,
  })

  useEffect(() => {
    fetchCompetitor()
  }, [])

  const fetchCompetitor = async () => {
    try {
      const response = await fetch(`/api/competitors/${params.id}`)
      const data = await response.json()
      
      if (data.competitor) {
        setCompetitor(data.competitor)
        setFormData({
          name: data.competitor.name,
          url: data.competitor.url,
          platform: data.competitor.platform,
          isActive: data.competitor.isActive,
          targetSelector: data.competitor.targetSelector || '',
          scrapeInterval: data.competitor.scrapeInterval || 24,
        })
      }
    } catch (error) {
      console.error('Error fetching competitor:', error)
      setError('Failed to load competitor')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (name === 'scrapeInterval') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const response = await fetch(`/api/competitors/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to update competitor')
        return
      }

      router.push(`/dashboard/competitors/${params.id}`)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Error updating competitor:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Loading competitor...</p>
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
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/competitors/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Competitor</h1>
          <p className="text-slate-600 mt-1">Update competitor information</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Competitor Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Nike, Adidas"
                required
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium">
                URL *
              </Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://example.com"
                required
              />
            </div>

            {/* Platform */}
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm font-medium">
                Platform
              </Label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="website">Website</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>

            {/* CSS Selector */}
            <div className="space-y-2">
              <Label htmlFor="targetSelector" className="text-sm font-medium">
                CSS Selector (Optional)
              </Label>
              <Input
                id="targetSelector"
                name="targetSelector"
                value={formData.targetSelector}
                onChange={handleInputChange}
                placeholder="e.g., .product-price, h1.title"
              />
              <p className="text-xs text-slate-500">
                Leave empty to track entire page
              </p>
            </div>

            {/* Scrape Interval */}
            <div className="space-y-2">
              <Label htmlFor="scrapeInterval" className="text-sm font-medium">
                Scrape Interval (Hours)
              </Label>
              <Input
                id="scrapeInterval"
                name="scrapeInterval"
                type="number"
                min="1"
                max="720"
                value={formData.scrapeInterval}
                onChange={handleInputChange}
              />
              <p className="text-xs text-slate-500">
                How often to check for changes (1-730 hours)
              </p>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="rounded border-slate-300"
              />
              <Label htmlFor="isActive" className="text-sm font-medium">
                Active - Continue tracking this competitor
              </Label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Link href={`/dashboard/competitors/${params.id}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}