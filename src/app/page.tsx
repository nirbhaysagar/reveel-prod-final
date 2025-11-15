import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUp, Star, Quote } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center">
            {/* Navigation Bar */}
            <nav className="bg-black rounded-full px-8 py-4 flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Reveel</span>
            </div>

              {/* Separator */}
              <div className="w-px h-6 bg-white/30"></div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <Link href="#why-us" className="text-white font-medium hover:text-gray-300 transition-colors">Why Us</Link>
                <Link href="#about" className="text-white font-medium hover:text-gray-300 transition-colors">About Us</Link>
                <Link href="#portfolio" className="text-white font-medium hover:text-gray-300 transition-colors">Portfolio</Link>
                </div>
                
              {/* CTA Buttons */}
              <div className="flex items-center space-x-3 ml-4">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full">
                  Book a call
                </Button>
                <Link href="/login">
                  <Button className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gray-50 relative">
        {/* Yellow stripe on the right */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-7xl md:text-9xl font-black text-black mb-8 leading-none tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
            Track competitors, detect changes, get AI insights
            <ArrowUp className="inline-block w-12 h-12 ml-4" />
          </h1>
          <p className="text-xl text-black mb-12 max-w-3xl mx-auto font-light" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300 }}>
            Monitor competitor websites automatically, detect changes in real-time, and receive AI-powered insights to make smarter business decisions.
          </p>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
            Book a call
            <ArrowUp className="inline-block w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Services & Metrics Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            {/* Features Column */}
            <div className="space-y-8">
              <h2 className="text-5xl font-bold text-black mb-12" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
                Features
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <div className="bg-white border-2 border-black text-black px-8 py-6 rounded-2xl text-base font-semibold hover:bg-gray-50 hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer block text-center shadow-xl hover:shadow-2xl hover:border-yellow-400">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                      <span>Competitor Tracking</span>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-white border-2 border-black text-black px-8 py-6 rounded-2xl text-base font-semibold hover:bg-gray-50 hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-pointer block text-center shadow-xl hover:shadow-2xl hover:border-green-400">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                      <span>Change Detection</span>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-white border-2 border-black text-black px-8 py-6 rounded-2xl text-base font-semibold hover:bg-gray-50 hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer block text-center shadow-xl hover:shadow-2xl hover:border-purple-400">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                      <span>AI Insights</span>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black text-white px-8 py-6 rounded-2xl text-base font-semibold hover:bg-gray-800 hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-pointer block text-center shadow-xl hover:shadow-2xl hover:border-yellow-400">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                      <span>Automated Scraping</span>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black text-white px-8 py-6 rounded-2xl text-base font-semibold hover:bg-gray-800 hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer block text-center shadow-xl hover:shadow-2xl hover:border-red-400">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                      <span>Real-time Alerts</span>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-white border-2 border-black text-black px-8 py-6 rounded-2xl text-base font-semibold hover:bg-gray-50 hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-pointer block text-center shadow-xl hover:shadow-2xl hover:border-yellow-400">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-6 h-6 text-yellow-400 mr-3 animate-pulse" />
                      <span>AI Reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Column - Enhanced Black Block */}
            <div className="bg-black text-white p-16 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="mb-12">
                  <div className="text-8xl font-black mb-4 animate-pulse" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    500+
                  </div>
                  <p className="text-white/90 text-lg">competitors tracked across industries.</p>
                </div>
                <div>
                  <div className="text-8xl font-black mb-4 animate-pulse" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    99.9%
                  </div>
                  <p className="text-white/90 text-lg">uptime with automated monitoring.</p>
                </div>
              </div>
            </div>
            
            {/* Data Insights Column */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-black font-bold text-sm">📊</span>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Data Insights
                  </h3>
                  <p className="text-gray-600 text-lg">Real-time analytics and trends</p>
                </div>

                {/* Mini Graph Visualization */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-end justify-between h-24 space-x-2">
                    <div className="flex flex-col items-center">
                      <div className="w-4 bg-blue-500 rounded-t h-16 animate-pulse"></div>
                      <span className="text-xs text-gray-500 mt-2">Jan</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-4 bg-green-500 rounded-t h-20 animate-pulse"></div>
                      <span className="text-xs text-gray-500 mt-2">Feb</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-4 bg-purple-500 rounded-t h-24 animate-pulse"></div>
                      <span className="text-xs text-gray-500 mt-2">Mar</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-4 bg-yellow-500 rounded-t h-18 animate-pulse"></div>
                      <span className="text-xs text-gray-500 mt-2">Apr</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-4 bg-red-500 rounded-t h-22 animate-pulse"></div>
                      <span className="text-xs text-gray-500 mt-2">May</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-4 bg-indigo-500 rounded-t h-26 animate-pulse"></div>
                      <span className="text-xs text-gray-500 mt-2">Jun</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <div className="text-2xl font-bold text-green-600">+47%</div>
                    <div className="text-sm text-gray-600">Growth Rate</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <div className="text-2xl font-bold text-blue-600">2.3K</div>
                    <div className="text-sm text-gray-600">Data Points</div>
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Upward trend detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              Reveel, because manual competitor tracking can't keep up
            </h2>
      </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Unlimited Monitoring */}
            <div className="group bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm font-medium text-white/80">FEATURE</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-300 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Unlimited Competitor Monitoring
                </h3>
                <p className="text-white/90 leading-relaxed">Track unlimited competitors with automated scraping and change detection across all industries.</p>
                <div className="mt-6 flex items-center text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                  <span className="mr-2">→</span>
                  <span>Learn more</span>
                </div>
              </div>
            </div>

            {/* Card 2: Real-time Alerts */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 relative hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer border border-green-200">
              <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <ArrowUp className="w-7 h-7 text-white animate-bounce" />
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-green-600">ALERTS</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Real-time Alerts
              </h3>
              <p className="text-gray-600 leading-relaxed">Get instant notifications when competitors make changes to their websites, pricing, or features.</p>
              <div className="mt-6 flex items-center text-sm text-green-600 group-hover:text-green-700 transition-colors duration-300">
                <span className="mr-2">→</span>
                <span>Learn more</span>
              </div>
            </div>

            {/* Card 3: Transparent Pricing */}
            <div className="group bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 relative hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer">
              <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-300">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">$</span>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-black rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-black/70">PRICING</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Transparent Pricing
              </h3>
              <p className="text-gray-800 leading-relaxed">No surprises here! Pay the same fixed price each month with no hidden fees.</p>
              <div className="mt-6 flex items-center text-sm text-black/70 group-hover:text-black transition-colors duration-300">
                <span className="mr-2">→</span>
                <span>Learn more</span>
              </div>
            </div>

            {/* Card 4: AI-Powered Insights */}
            <div className="group bg-white border-2 border-gray-200 rounded-3xl p-8 relative hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer hover:border-yellow-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-sm font-bold text-black">AI</span>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-yellow-600">AI POWERED</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-yellow-600 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 leading-relaxed">Advanced AI analyzes competitor changes and provides strategic recommendations automatically.</p>
              <div className="mt-6 flex items-center text-sm text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300">
                <span className="mr-2">→</span>
                <span>Learn more</span>
              </div>
            </div>

            {/* Card 5: Flexible Plans */}
            <div className="group bg-gradient-to-br from-orange-50 to-amber-100 rounded-3xl p-8 relative hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer border border-orange-200">
              <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-300">
                <div className="flex space-x-2">
                  <div className="w-8 h-6 bg-gray-300 rounded group-hover:bg-gray-400 transition-colors duration-300"></div>
                  <div className="w-8 h-6 bg-gray-300 rounded group-hover:bg-gray-400 transition-colors duration-300"></div>
                  <div className="w-8 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded group-hover:from-red-500 group-hover:to-pink-500 transition-all duration-300"></div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-orange-600">FLEXIBLE</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Flexible & Scalable
              </h3>
              <p className="text-gray-600 leading-relaxed">Scale up or down as needed, and pause or cancel anytime. No long-term commitments.</p>
              <div className="mt-6 flex items-center text-sm text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                <span className="mr-2">→</span>
                <span>Learn more</span>
              </div>
            </div>

            {/* Card 6: Your Data */}
            <div className="group bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 text-white relative overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-300">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-4 py-2 shadow-lg">
                  <span className="text-black text-sm font-bold">100% Yours</span>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-white/80">OWNERSHIP</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-300 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Your Data, Your Insights
              </h3>
              <p className="text-white/90 leading-relaxed">All competitor data and insights belong to you. Export anytime, own your competitive intelligence.</p>
              <div className="mt-6 flex items-center text-sm text-white/70 group-hover:text-yellow-300 transition-colors duration-300">
                <span className="mr-2">→</span>
                <span>Learn more</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-black mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
            Ready to stay ahead of your competition?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join hundreds of businesses already using Reveel to track competitors, detect changes, and make smarter strategic decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
                Start Free Trial
                <ArrowUp className="inline-block w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 rounded-full text-lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}