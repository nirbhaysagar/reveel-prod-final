import { BarChart3, Download, Calendar, TrendingUp, Eye, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Reports
          </h1>
          <p className="text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Comprehensive analytics and insights from your competitor monitoring
          </p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-6 py-3 font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Total Reports</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>24</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated this month</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Changes Tracked</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>1,247</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Across all competitors</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>AI Insights</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>89</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated this week</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Trend Score</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>8.4</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Out of 10</p>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Recent Reports</h2>
          <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Your latest competitive intelligence reports
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Weekly Competitive Analysis</h3>
                  <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Comprehensive report covering all monitored competitors</p>
                  <p className="text-xs text-gray-500 font-light mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Pricing Intelligence Report</h3>
                  <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Analysis of pricing changes across competitor websites</p>
                  <p className="text-xs text-gray-500 font-light mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Product Launch Analysis</h3>
                  <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Detailed insights on new product releases and updates</p>
                  <p className="text-xs text-gray-500 font-light mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated 3 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Report Templates</h2>
          <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Pre-built templates for common analysis needs
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center mb-3">
                <Calendar className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Weekly Summary</h3>
              </div>
              <p className="text-sm text-gray-600 font-light mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Comprehensive weekly overview of all competitor activities
              </p>
              <Button size="sm" className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                Generate Report
              </Button>
            </div>

            <div className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Pricing Analysis</h3>
              </div>
              <p className="text-sm text-gray-600 font-light mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Deep dive into pricing strategies and changes
              </p>
              <Button size="sm" className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                Generate Report
              </Button>
            </div>

            <div className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center mb-3">
                <FileText className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Content Changes</h3>
              </div>
              <p className="text-sm text-gray-600 font-light mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Track and analyze content updates across competitors
              </p>
              <Button size="sm" className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

