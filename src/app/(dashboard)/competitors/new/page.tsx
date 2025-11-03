'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewCompetitorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    platform: 'website',
    targetSelector: '',
    scrapeInterval: '24',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create competitor')
      } else {
        router.push('/dashboard/competitors')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/competitors">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add Competitor</h1>
          <p className="text-slate-600 mt-1">
            Track a new competitor's website or social media
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Details</CardTitle>
          <CardDescription>
            Enter the information for the competitor you want to track
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Competitor Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Nike, Amazon, Shopify"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url">URL to Track *</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/product/123"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                disabled={loading}
              />
              <p className="text-xs text-slate-500">
                Enter the full URL you want to monitor
              </p>
            </div>

            {/* Platform */}
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <select
                id="platform"
                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                disabled={loading}
              >
                <option value="website">Website</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>

            {/* Target Selector */}
            <div className="space-y-2">
              <Label htmlFor="targetSelector">CSS Selector (Optional)</Label>
              <Input
                id="targetSelector"
                type="text"
                placeholder="e.g., .product-price, h1.title"
                value={formData.targetSelector}
                onChange={(e) => setFormData({ ...formData, targetSelector: e.target.value })}
                disabled={loading}
              />
              <p className="text-xs text-slate-500">
                Track a specific element on the page (leave empty to track entire page)
              </p>
            </div>

            {/* Scrape Interval */}
            <div className="space-y-2">
              <Label htmlFor="scrapeInterval">Scrape Interval (hours)</Label>
              <Input
                id="scrapeInterval"
                type="number"
                min="1"
                value={formData.scrapeInterval}
                onChange={(e) => setFormData({ ...formData, scrapeInterval: e.target.value })}
                disabled={loading}
              />
              <p className="text-xs text-slate-500">
                How often to check for changes (default: 24 hours)
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-3">
              <Link href="/dashboard/competitors" className="flex-1">
                <Button type="button" variant="outline" className="w-full" disabled={loading}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Creating...' : 'Create Competitor'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
