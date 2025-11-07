'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Settings, User, Bell, Shield, Key, Globe, Database, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    company: '',
    role: '',
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    aiInsights: true,
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' })
      } else {
        setMessage({ type: 'success', text: 'Profile updated successfully' })
        await updateSession()
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/user/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to change password' })
      } else {
        setMessage({ type: 'success', text: 'Password changed successfully' })
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
          Settings
        </h1>
        <p className="text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
          Manage your account preferences and platform configuration
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 rounded-2xl font-medium text-sm ${activeTab === 'profile' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`} 
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-4 py-3 rounded-2xl font-medium text-sm ${activeTab === 'notifications' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`} 
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              >
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-4 py-3 rounded-2xl font-medium text-sm ${activeTab === 'security' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`} 
                style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
              >
                <Shield className="w-5 h-5 mr-3" />
                Security
              </button>
              <button className="w-full flex items-center px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-50 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                <Globe className="w-5 h-5 mr-3" />
                Integrations
              </button>
              <button className="w-full flex items-center px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-50 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                <Database className="w-5 h-5 mr-3" />
                Data & Privacy
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message Display */}
          {message.text && (
            <div className={`p-4 rounded-2xl ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Profile Information</h2>
                <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Update your personal information and preferences
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Full Name</label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your Name" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Email Address</label>
                    <Input 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Company</label>
                    <Input 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Your Company" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Role</label>
                    <Input 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="Product Manager" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-6 py-3 font-medium" 
                      style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Notification Preferences</h2>
                <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Choose how you want to be notified about changes
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {[
                    { key: 'emailNotifications', title: 'Email Notifications', desc: 'Receive email alerts for important changes' },
                    { key: 'pushNotifications', title: 'Push Notifications', desc: 'Get instant browser notifications' },
                    { key: 'weeklyReports', title: 'Weekly Reports', desc: 'Receive weekly summary reports' },
                    { key: 'aiInsights', title: 'AI Insights', desc: 'Get notified about AI-generated insights' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>{item.title}</h3>
                        <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key as keyof typeof notificationSettings)}
                        className={`w-12 h-6 rounded-full relative transition-all ${notificationSettings[item.key as keyof typeof notificationSettings] ? 'bg-gray-900' : 'bg-gray-200'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${notificationSettings[item.key as keyof typeof notificationSettings] ? 'right-0.5' : 'left-0.5'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Change Password</h2>
                <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Update your account password
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Current Password</label>
                    <Input 
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      placeholder="Enter current password" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>New Password</label>
                    <Input 
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      placeholder="Enter new password" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Confirm Password</label>
                    <Input 
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-6 py-3 font-medium" 
                      style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
