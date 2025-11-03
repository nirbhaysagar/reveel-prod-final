import { TrendingUp, Users, AlertTriangle, Brain, ArrowUpRight, Activity, Zap, Target } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Good morning, John
          </h1>
          <p className="text-lg text-gray-600 mt-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Here's what's happening with your competitive intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            <Zap className="w-4 h-4 inline mr-2" />
            Quick Scan
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-300 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            <Target className="w-4 h-4 inline mr-2" />
            Add Competitor
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +12%
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              24
            </h3>
            <p className="text-gray-600 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Competitors Tracked
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              +3 this month
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-7 h-7 text-green-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +8%
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              47
            </h3>
            <p className="text-gray-600 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Changes Detected
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              +12 this week
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="w-7 h-7 text-orange-600" />
            </div>
            <div className="flex items-center text-orange-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +5
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              8
            </h3>
            <p className="text-gray-600 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              Active Alerts
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              3 new today
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-7 h-7 text-purple-600" />
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +23%
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              156
            </h3>
            <p className="text-gray-600 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              AI Insights
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              +23 this week
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                  Recent Activity
                </h2>
                <p className="text-gray-600 mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Latest changes from your competitors
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                View All
              </button>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      Nike
                    </h3>
                    <span className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      2h ago
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Price drop detected on Air Max 270
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      Price Change
                    </span>
                    <span className="text-sm text-green-600 font-medium">-15%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      Adidas
                    </h3>
                    <span className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      5h ago
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    New product launch: Ultraboost 22
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      Product Launch
                    </span>
                    <span className="text-sm text-gray-600">$180</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      Puma
                    </h3>
                    <span className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      1d ago
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Marketing campaign updated
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                      Campaign
                    </span>
                    <span className="text-sm text-gray-600">Social Media</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Insights */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Add Competitor
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Track a new competitor
                  </p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Quick Scan
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Run immediate analysis
                  </p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Generate Report
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Create AI insights
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Performance
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Detection Accuracy
                  </span>
                  <span className="text-sm font-bold text-gray-900">98.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Uptime
                  </span>
                  <span className="text-sm font-bold text-gray-900">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Response Time
                  </span>
                  <span className="text-sm font-bold text-gray-900">1.2s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}