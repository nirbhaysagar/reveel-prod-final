import { Brain, TrendingUp, Target, Zap, Lightbulb, BarChart3, Eye, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function InsightsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            AI Insights
          </h1>
          <p className="text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Intelligent analysis and recommendations powered by AI
          </p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-6 py-3 font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate New Insights
        </Button>
      </div>

      {/* Insight Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Total Insights</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>156</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated this month</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>High Priority</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>12</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Require attention</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Trend Accuracy</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>94%</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Prediction accuracy</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Action Items</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>8</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Recommended actions</p>
        </div>
      </div>

      {/* Recent Insights */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Recent Insights</h2>
          <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Latest AI-generated insights and recommendations
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* High Priority Insight */}
            <div className="p-6 rounded-2xl border border-red-200 bg-red-50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Pricing Strategy Alert</h3>
                    <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>High Priority • Generated 2 hours ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  High Priority
                </span>
              </div>
              <p className="text-gray-700 mb-4 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Nike has reduced prices by 15% on their premium product line. This could indicate a shift in their pricing strategy 
                or preparation for a major product launch. Consider analyzing your pricing positioning and potential competitive response.
              </p>
              <div className="flex items-center gap-3">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                  Take Action
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-red-100 text-red-600" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>

            {/* Trend Analysis */}
            <div className="p-6 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center mr-4">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Market Trend Analysis</h3>
                    <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Medium Priority • Generated 4 hours ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Trend Analysis
                </span>
              </div>
              <p className="text-gray-700 mb-4 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Analysis of competitor content reveals a 23% increase in sustainability-focused messaging across all major brands. 
                This suggests a market shift towards eco-conscious positioning that your brand should consider addressing.
              </p>
              <div className="flex items-center gap-3">
                <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                  View Analysis
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  <Eye className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </div>

            {/* Product Launch Insight */}
            <div className="p-6 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center mr-4">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Product Launch Prediction</h3>
                    <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Low Priority • Generated 6 hours ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Prediction
                </span>
              </div>
              <p className="text-gray-700 mb-4 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Based on recent website changes and job postings, Adidas appears to be preparing for a major product launch 
                in the next 30-45 days. Monitor their website closely for early indicators and prepare competitive response strategies.
              </p>
              <div className="flex items-center gap-3">
                <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                  Monitor Closely
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-gray-100" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  <Eye className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mr-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Strategic Insights</h3>
          </div>
          <p className="text-sm text-gray-600 font-light mb-4" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            High-level strategic recommendations based on competitor analysis
          </p>
          <div className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>23</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated this month</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mr-4">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Performance Insights</h3>
          </div>
          <p className="text-sm text-gray-600 font-light mb-4" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Data-driven insights about competitor performance and trends
          </p>
          <div className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>67</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated this month</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mr-4">
              <Lightbulb className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Opportunity Insights</h3>
          </div>
          <p className="text-sm text-gray-600 font-light mb-4" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Identified opportunities and gaps in the competitive landscape
          </p>
          <div className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>34</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated this month</p>
        </div>
      </div>
    </div>
  )
}

