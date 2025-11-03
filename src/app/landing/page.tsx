import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUp, Star, Quote } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-black">FirstPlace</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#why-us" className="text-black font-medium hover:text-gray-600 transition-colors">Why Us</Link>
              <Link href="#about" className="text-black font-medium hover:text-gray-600 transition-colors">About Us</Link>
              <Link href="#portfolio" className="text-black font-medium hover:text-gray-600 transition-colors">Portfolio</Link>
            </nav>

            {/* CTA Button */}
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg">
              Book a call
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-black mb-8 leading-tight">
            We drive growth to your business
            <ArrowUp className="inline-block w-8 h-8 ml-2 animate-bounce" />
          </h1>
          <p className="text-xl text-black mb-12 max-w-3xl mx-auto">
            Unlock your brand's potential with our proven marketing expertise. From strategy to execution, we drive growth.
          </p>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105">
            Book a call
            <ArrowUp className="inline-block w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Services & Metrics Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Services Column */}
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Services</h2>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white border-2 border-black text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">Web Design</span>
                <span className="bg-white border-2 border-black text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">Social Media</span>
                <span className="bg-white border-2 border-black text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">Content Creation</span>
                <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">Marketing</span>
                <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">Branding</span>
                <span className="bg-white border-2 border-black text-black px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  Paid Ads
                </span>
              </div>
            </div>

            {/* Metrics Column - Black Block */}
            <div className="bg-black text-white p-12 rounded-2xl">
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2">1.2M+</div>
                <p className="text-white/80">users have interacted with websites built by us.</p>
              </div>
              <div>
                <div className="text-6xl font-bold mb-2">$3M</div>
                <p className="text-white/80">in funding raised by start-ups we've worked with.</p>
              </div>
            </div>
            
            {/* Testimonial Column */}
            <div>
              <Quote className="w-16 h-16 text-black mb-6" />
              <p className="text-lg text-black mb-6 italic">
                "The final product exceeded my expectations. Impressed with the results!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-black font-semibold">AS</span>
                </div>
                <span className="text-black font-medium">AS.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
              <h2 className="text-5xl font-bold text-white mb-8">
                Why our clients choose us as partners
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded mr-3"></div>
                  <div className="w-8 h-8 bg-yellow-400 rounded -ml-2"></div>
                </div>
                <h3 className="text-xl font-bold text-white">Expertise and Specialization</h3>
                <p className="text-white/80">
                  Our team brings deep industry knowledge and specialized skills to deliver exceptional results.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded mr-3"></div>
                  <div className="w-8 h-8 bg-yellow-400 rounded -ml-2"></div>
                </div>
                <h3 className="text-xl font-bold text-white">Fresh Perspectives</h3>
                <p className="text-white/80">
                  We bring innovative ideas and fresh approaches to solve your unique challenges.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded mr-3"></div>
                  <div className="w-8 h-8 bg-yellow-400 rounded -ml-2"></div>
                </div>
                <h3 className="text-xl font-bold text-white">Scalability and Flexibility</h3>
                <p className="text-white/80">
                  Our solutions grow with your business and adapt to changing market conditions.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded mr-3"></div>
                  <div className="w-8 h-8 bg-yellow-400 rounded -ml-2"></div>
                </div>
                <h3 className="text-xl font-bold text-white">Resource Optimization</h3>
                <p className="text-white/80">
                  We help you maximize your ROI by optimizing resources and eliminating waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get to Know Us Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-black mb-8">
                Get to know us a little more
              </h2>
              <div className="space-y-6 text-lg text-black">
                <p>
                  Our approach combines strategic thinking with innovative tactics to drive tangible results and achieve our clients' goals.
                </p>
                <p>
                  We are dedicated to delivering exceptional value and helping businesses thrive in the ever-evolving marketplace.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <p className="text-gray-600 font-medium">Team Photo</p>
                  <p className="text-sm text-gray-500">4 team members</p>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">#1 Team!</h3>
                <p className="text-lg text-black">
                  We've helped hundreds of partners, ranging from startups to medium-sized businesses to achieve their goals. And stellar feedback — is our reward!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section Header */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-black">
            Incredible projects we have worked on
          </h2>
      </div>
      </section>
    </div>
  )
}
