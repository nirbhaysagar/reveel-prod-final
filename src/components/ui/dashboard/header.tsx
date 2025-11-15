'use client'

import { Input } from '@/components/ui/input'
import { Bell, Search, User, LogOut, BarChart3, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [unreadCount, setUnreadCount] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  // Fetch unread notification count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('/api/notifications')
        if (response.ok) {
          const data = await response.json()
          const unread = data.notifications?.filter((n: any) => !n.isRead).length || 0
          setUnreadCount(unread)
        }
      } catch (error) {
        console.error('Failed to fetch notification count:', error)
      }
    }

    fetchUnreadCount()
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const handleQuickScan = async () => {
    setIsScanning(true)
    try {
      const response = await fetch('/api/competitors/quick-scan', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert(`✅ ${data.message}`)
        // Refresh the page to show updated data
        router.refresh()
      } else {
        alert(`❌ ${data.error || 'Failed to start quick scan'}`)
      }
    } catch (error) {
      console.error('Quick scan error:', error)
      alert('❌ Failed to start quick scan. Please try again.')
    } finally {
      setIsScanning(false)
    }
  }

  const userInitials = session?.user?.name
    ? session.user.name.substring(0, 2).toUpperCase()
    : 'U'

  const userName = session?.user?.name || 'User'
  const userEmail = session?.user?.email || ''

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-gray-100 bg-white/80 backdrop-blur-xl px-8 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-600 transition-colors duration-300" />
          <Input
            type="search"
            placeholder="Search competitors, reports, insights..."
            className="pl-12 pr-20 py-4 w-full rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-50/50 font-medium text-base transition-all duration-300 hover:bg-gray-100/50 focus:bg-white focus:shadow-lg"
            style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="text-xs text-gray-400 bg-gray-200/80 px-2 py-1 rounded-lg font-medium">
              ⌘K
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Quick Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/dashboard/insights">
            <Button variant="ghost" size="sm" className="rounded-2xl hover:bg-gray-100 px-4 py-2 text-sm font-medium transition-all duration-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleQuickScan}
            disabled={isScanning}
            className="rounded-2xl hover:bg-gray-100 px-4 py-2 text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className={`w-4 h-4 mr-2 ${isScanning ? 'animate-pulse' : ''}`} />
            {isScanning ? 'Scanning...' : 'Quick Scan'}
          </Button>
        </div>

        {/* Notifications */}
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative rounded-2xl hover:bg-gray-100 transition-all duration-300 group">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </>
            )}
          </Button>
        </Link>

        {/* User Menu (opens Settings) */}
        <Link 
          href="/dashboard/settings"
          className="flex items-center gap-4 rounded-2xl hover:bg-gray-100 px-4 py-2 transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-medium text-sm">{userInitials}</span>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              {userName}
            </p>
            <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              {userEmail}
            </p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </Link>

        {/* Explicit Sign out */}
        <Button
          variant="ghost"
          onClick={handleSignOut}
          aria-label="Sign out"
          className="rounded-2xl hover:bg-gray-100 px-3 py-2"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}