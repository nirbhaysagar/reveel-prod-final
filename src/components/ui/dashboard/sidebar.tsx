'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings,
  BarChart3,
  Clock,
  Bell,
  Shield
} from 'lucide-react'

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Competitors',
    href: '/dashboard/competitors',
    icon: Users,
  },
  {
    name: 'Jobs',
    href: '/dashboard/jobs',
    icon: Clock,
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
  },
  {
    name: 'Security',
    href: '/dashboard/security',
    icon: Shield,
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: BarChart3,
  },
  {
    name: 'Insights',
    href: '/dashboard/insights',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-80 bg-white border-r border-gray-100 h-screen sticky top-0">
      <div className="p-8">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                Reveel
              </h1>
              <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Competitive Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-5 py-4 rounded-2xl text-base font-medium transition-colors duration-200',
                  isActive
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif', fontSize: '22px' }}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-300',
                  isActive 
                    ? 'bg-white/10' 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                )}>
                  <Icon className={cn(
                    'w-5 h-5 transition-all duration-300',
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-600 group-hover:text-gray-900'
                  )} />
                </div>
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex items-center px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                John Doe
              </p>
              <p className="text-base text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Admin
              </p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}