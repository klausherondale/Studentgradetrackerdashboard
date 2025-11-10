import { User, Bell, Lock, Globe, Palette, Database, Shield, Mail } from 'lucide-react';
import { useState } from 'react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyReport: true,
  });

  const [gradeSettings, setGradeSettings] = useState({
    aPlus: '95',
    a: '90',
    bPlus: '85',
    b: '80',
    cPlus: '75',
    c: '70',
    d: '60',
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-[#1E293B] mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg text-[#1E293B]">Profile Settings</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                SJ
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Dr. Sarah Johnson"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="sarah.johnson@university.edu"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      defaultValue="Computer Science"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg text-[#1E293B]">Notification Preferences</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                { key: 'push', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                { key: 'sms', label: 'SMS Alerts', desc: 'Get important alerts via SMS' },
                { key: 'weeklyReport', label: 'Weekly Reports', desc: 'Receive weekly performance summary' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm text-[#1E293B]">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={(e) =>
                        setNotifications({ ...notifications, [item.key]: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grading System */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg text-[#1E293B]">GPA Scale Configuration</h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">Configure the minimum percentage required for each letter grade (4.0 GPA scale)</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'aPlus', label: 'A+ (4.0)', color: 'bg-green-100 text-green-800' },
                { key: 'a', label: 'A (4.0)', color: 'bg-green-100 text-green-800' },
                { key: 'bPlus', label: 'B+ (3.5)', color: 'bg-blue-100 text-blue-800' },
                { key: 'b', label: 'B (3.0)', color: 'bg-blue-100 text-blue-800' },
                { key: 'cPlus', label: 'C+ (2.5)', color: 'bg-yellow-100 text-yellow-800' },
                { key: 'c', label: 'C (2.0)', color: 'bg-yellow-100 text-yellow-800' },
                { key: 'd', label: 'D (1.0)', color: 'bg-orange-100 text-orange-800' },
              ].map((grade) => (
                <div key={grade.key}>
                  <label className="block text-sm text-gray-700 mb-2">
                    <span className={`px-2 py-1 rounded text-xs ${grade.color}`}>{grade.label}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={gradeSettings[grade.key as keyof typeof gradeSettings]}
                      onChange={(e) =>
                        setGradeSettings({ ...gradeSettings, [grade.key]: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">%</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Grading Scale
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg text-[#1E293B]">Security</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors">
              Change Password
            </button>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg text-[#1E293B]">System Preferences</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Academic Year</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>2025-2026</option>
                  <option>2024-2025</option>
                  <option>2023-2024</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Default Language</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Timezone</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-6 (Central Time)</option>
                  <option>UTC-7 (Mountain Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
