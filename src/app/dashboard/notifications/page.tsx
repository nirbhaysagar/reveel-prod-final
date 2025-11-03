'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Bell, Mail, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default function NotificationsPage() {
  const [sendingEmail, setSendingEmail] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'change',
      title: 'Price Change Detected',
      message: 'Nike Air Max price dropped from $120 to $99',
      isRead: false,
      createdAt: '2025-10-22T10:30:00Z',
      competitor: 'Nike'
    },
    {
      id: '2',
      type: 'insight',
      title: 'AI Insight Generated',
      message: 'New strategic recommendation available for Adidas campaign',
      isRead: false,
      createdAt: '2025-10-22T09:15:00Z',
      competitor: 'Adidas'
    },
    {
      id: '3',
      type: 'scrape',
      title: 'Scraping Completed',
      message: 'Amazon competitor data updated successfully',
      isRead: true,
      createdAt: '2025-10-22T08:45:00Z',
      competitor: 'Amazon'
    },
    {
      id: '4',
      type: 'alert',
      title: 'High Activity Alert',
      message: 'Unusual spike in competitor activity detected',
      isRead: true,
      createdAt: '2025-10-21T16:20:00Z',
      competitor: 'Google'
    },
    {
      id: '5',
      type: 'report',
      title: 'Weekly Report Ready',
      message: 'Your weekly competitive intelligence report is available',
      isRead: false,
      createdAt: '2025-10-21T14:00:00Z',
      competitor: 'All'
    }
  ])

  const handleSendTestEmail = async () => {
    setSendingEmail(true)
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSendingEmail(false)
    alert('Test email sent successfully! Check your inbox.')
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'change': return AlertCircle
      case 'insight': return Info
      case 'scrape': return CheckCircle
      case 'alert': return Bell
      case 'report': return Mail
      default: return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'change': return 'text-red-600 bg-red-50'
      case 'insight': return 'text-blue-600 bg-blue-50'
      case 'scrape': return 'text-green-600 bg-green-50'
      case 'alert': return 'text-yellow-600 bg-yellow-50'
      case 'report': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-600 mt-1">Manage your alerts and notifications</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleSendTestEmail} 
            disabled={sendingEmail}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {sendingEmail ? 'Sending...' : 'Send Test Email'}
          </Button>
          {unreadCount > 0 && (
            <Button 
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Total Notifications</h3>
              <div className="text-2xl font-bold">{notifications.length}</div>
            </div>
            <Bell className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Unread</h3>
              <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Change Alerts</h3>
              <div className="text-2xl font-bold text-orange-600">
                {notifications.filter(n => n.type === 'change').length}
              </div>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-600">AI Insights</h3>
              <div className="text-2xl font-bold text-purple-600">
                {notifications.filter(n => n.type === 'insight').length}
              </div>
            </div>
            <Info className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Recent Notifications</h2>
          <p className="text-sm text-slate-600 mt-1">
            Latest alerts and updates from your competitors
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              const colorClass = getNotificationColor(notification.type)
              
              return (
                <div 
                  key={notification.id} 
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    notification.isRead 
                      ? 'border-slate-200 bg-slate-50' 
                      : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{notification.title}</span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {notification.competitor}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Mark Read
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

