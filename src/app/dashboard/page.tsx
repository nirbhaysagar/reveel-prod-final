export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
          Dashboard
        </h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
          Welcome back! Here's what's happening with your competitors.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-blue-500 rounded-lg"></div>
            </div>
            <div className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">+2</div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Total Competitors</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>12</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>+2 this month</p>
        </div>
        
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-orange-500 rounded-lg"></div>
            </div>
            <div className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">+12</div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Changes Detected</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>47</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>+12 this week</p>
        </div>
        
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
            </div>
            <div className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">8</div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>AI Insights</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>8</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated today</p>
        </div>
        
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
              <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
            </div>
            <div className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">5</div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Active Jobs</h3>
          <div className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>5</div>
          <p className="text-sm text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Running now</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Recent Activity</h2>
              <p className="text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Latest changes detected across your competitors
              </p>
            </div>
            <div className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-2xl cursor-pointer hover:bg-blue-100 transition-colors duration-300">
              View All
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <div className="group flex items-center justify-between py-4 px-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-6 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Nike updated pricing</p>
                  <p className="text-sm text-gray-500 font-light mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>2 minutes ago • Nike.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Price Change</span>
                <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors duration-300"></div>
              </div>
            </div>
            
            <div className="group flex items-center justify-between py-4 px-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-6"></div>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Adidas launched new product</p>
                  <p className="text-sm text-gray-500 font-light mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>1 hour ago • Adidas.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Product Launch</span>
                <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors duration-300"></div>
              </div>
            </div>
            
            <div className="group flex items-center justify-between py-4 px-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-6"></div>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Puma updated homepage</p>
                  <p className="text-sm text-gray-500 font-light mt-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>3 hours ago • Puma.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Content Update</span>
                <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

