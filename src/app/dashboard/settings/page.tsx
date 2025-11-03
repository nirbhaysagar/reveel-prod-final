import { Settings, User, Bell, Shield, Key, Globe, Database, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
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
              <button className="w-full flex items-center px-4 py-3 rounded-2xl bg-gray-900 text-white font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                <User className="w-5 h-5 mr-3" />
                Profile
              </button>
              <button className="w-full flex items-center px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-50 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </button>
              <button className="w-full flex items-center px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-50 font-medium text-sm" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
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
          {/* Profile Settings */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Profile Information</h2>
              <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Update your personal information and preferences
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>First Name</label>
                    <Input 
                      placeholder="John" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Last Name</label>
                    <Input 
                      placeholder="Doe" 
                      className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                      style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Email Address</label>
                  <Input 
                    placeholder="john@example.com" 
                    className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                    style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Company</label>
                  <Input 
                    placeholder="Your Company" 
                    className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                    style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Role</label>
                  <Input 
                    placeholder="Product Manager" 
                    className="rounded-2xl border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                    style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-6 py-3 font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Notification Preferences</h2>
              <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Choose how you want to be notified about changes
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Email Notifications</h3>
                    <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Receive email alerts for important changes</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-900 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Push Notifications</h3>
                    <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Get instant browser notifications</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Weekly Reports</h3>
                    <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Receive weekly summary reports</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-900 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>AI Insights</h3>
                    <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Get notified about AI-generated insights</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-900 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Security</h2>
              <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Manage your account security and access
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center">
                    <Key className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Change Password</h3>
                      <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Last changed 30 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Change
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Enable
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>API Access</h3>
                      <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Manage your API keys and access</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

