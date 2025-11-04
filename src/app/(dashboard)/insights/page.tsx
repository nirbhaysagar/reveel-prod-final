'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Sparkles, TrendingUp, Lightbulb } from 'lucide-react'

export default function InsightsPage() {
  const [generating, setGenerating] = useState(false)
  const [report, setReport] = useState<any>(null)

  const handleGenerateReport = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (data.report) {
        setReport(data.report)
      }
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Insights</h1>
          <p className="text-slate-600 mt-1">
            AI-powered competitive intelligence and recommendations
          </p>
        </div>
        <Button onClick={handleGenerateReport} disabled={generating}>
          <Sparkles className="w-4 h-4 mr-2" />
          {generating ? 'Generating...' : 'Generate Weekly Report'}
        </Button>
      </div>

      {/* Report Display */}
      {report && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Executive Summary
              </CardTitle>
              <CardDescription>
                {report.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 whitespace-pre-line">{report.summary}</p>
            </CardContent>
          </Card>

          {/* Key Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Key Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {report.insights.keyChanges?.map((change: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Strategic Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {report.insights.recommendations?.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!report && !generating && (
        <Card>
          <CardContent className="py-12 text-center">
            <Sparkles className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
            <p className="text-slate-500 mb-4">
              Generate your first AI-powered competitive intelligence report
            </p>
            <Button onClick={handleGenerateReport}>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
