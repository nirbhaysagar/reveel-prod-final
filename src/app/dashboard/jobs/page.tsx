'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

export default function JobsPage() {
  const [scheduling, setScheduling] = useState(false)

  const handleScheduleJobs = async () => {
    setScheduling(true)
    await new Promise(r => setTimeout(r, 500))
    setScheduling(false)
    alert('No worker configured. Set REDIS_URL and run: npm run worker')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Background Jobs</h1>
          <p className="text-slate-600 mt-1">Enable the worker to process scraping jobs</p>
        </div>
        <Button onClick={handleScheduleJobs} disabled={scheduling} className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          {scheduling ? 'Scheduling…' : 'Schedule All Jobs'}
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center text-gray-600">
        No jobs to display yet. Configure REDIS_URL and run the worker.
      </div>
    </div>
  )
}
