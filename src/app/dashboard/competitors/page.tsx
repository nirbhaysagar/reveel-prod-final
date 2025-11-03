'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'

export default function CompetitorsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight flex items-center gap-4" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              Competitors
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Manage and track your competitors' activities
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)} 
            className="flex items-center gap-3 px-6 py-3 text-base font-medium"
            style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Add Competitor
          </Button>
        </div>
      </div>

      {showForm ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-6" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Add New Competitor
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Competitor Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 font-light text-base transition-all duration-300 hover:bg-gray-100 focus:bg-white"
                placeholder="e.g., Nike, Amazon, Google"
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Website URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 font-light text-base transition-all duration-300 hover:bg-gray-100 focus:bg-white"
                placeholder="https://www.example.com"
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              />
            </div>
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add Competitor
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Empty State */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
            <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Competitors Yet</h3>
            <p className="text-slate-600 mb-6">
              Start tracking your competitors by adding your first competitor.
            </p>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              Add Your First Competitor
            </Button>
          </div>

          {/* Sample Competitors (for testing) */}
          <div className="grid gap-6">
            <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Nike</h3>
                    <p className="text-gray-600 font-light mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>https://www.nike.com</p>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Active
                      </span>
                      <span className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Last scraped: 2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="px-6 py-2">Edit</Button>
                  <Link href="/dashboard/competitors/nike">
                    <Button variant="outline" size="sm" className="px-6 py-2">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                    <div className="w-8 h-8 bg-orange-500 rounded-xl"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Adidas</h3>
                    <p className="text-gray-600 font-light mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>https://www.adidas.com</p>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Active
                      </span>
                      <span className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Last scraped: 5 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="px-6 py-2">Edit</Button>
                  <Link href="/dashboard/competitors/adidas">
                    <Button variant="outline" size="sm" className="px-6 py-2">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
