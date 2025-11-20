import { useState } from 'react';
import { Save, Bell, CreditCard, Shield, Globe } from 'lucide-react';
import { OwnerSidebar } from '../components/layout';

export function OwnerSettings() {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    bookingNotifications: true,
    payoutNotifications: true,
    marketingEmails: false,
    
    // Payment Settings
    payoutMethod: 'bank',
    bankAccount: '',
    accountHolder: '',
    iban: '',
    
    // Privacy Settings
    profileVisibility: 'public',
    showContactInfo: true,
    
    // Language Settings
    language: 'en',
    timezone: 'Europe/Berlin',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OwnerSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <div className="bg-white py-6">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600 mb-6">Manage your account settings and preferences</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Notification Settings */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-6 h-6 text-brand-blue" />
                    <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Email Notifications</span>
                        <p className="text-xs text-gray-500">Receive email updates about your account</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                        className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Booking Notifications</span>
                        <p className="text-xs text-gray-500">Get notified when someone books your studio</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.bookingNotifications}
                        onChange={(e) => setSettings({ ...settings, bookingNotifications: e.target.checked })}
                        className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Payout Notifications</span>
                        <p className="text-xs text-gray-500">Receive notifications about your payouts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.payoutNotifications}
                        onChange={(e) => setSettings({ ...settings, payoutNotifications: e.target.checked })}
                        className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Marketing Emails</span>
                        <p className="text-xs text-gray-500">Receive tips, updates, and promotional emails</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.marketingEmails}
                        onChange={(e) => setSettings({ ...settings, marketingEmails: e.target.checked })}
                        className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue"
                      />
                    </label>
                  </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-brand-blue" />
                    <h2 className="text-xl font-semibold text-gray-900">Payment & Payouts</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payout Method</label>
                      <select
                        value={settings.payoutMethod}
                        onChange={(e) => setSettings({ ...settings, payoutMethod: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      >
                        <option value="bank">Bank Transfer</option>
                        <option value="paypal">PayPal</option>
                        <option value="stripe">Stripe</option>
                      </select>
                    </div>
                    {settings.payoutMethod === 'bank' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                          <input
                            type="text"
                            value={settings.accountHolder}
                            onChange={(e) => setSettings({ ...settings, accountHolder: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
                          <input
                            type="text"
                            value={settings.iban}
                            onChange={(e) => setSettings({ ...settings, iban: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            placeholder="DE89 3704 0044 0532 0130 00"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-brand-blue" />
                    <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Show Contact Information</span>
                        <p className="text-xs text-gray-500">Allow renters to see your contact details</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.showContactInfo}
                        onChange={(e) => setSettings({ ...settings, showContactInfo: e.target.checked })}
                        className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue"
                      />
                    </label>
                  </div>
                </div>

                {/* Language & Region */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-6 h-6 text-brand-blue" />
                    <h2 className="text-xl font-semibold text-gray-900">Language & Region</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      >
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      >
                        <option value="Europe/Berlin">Europe/Berlin (GMT+1)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                        <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="btn-primary flex items-center gap-2 px-6 py-3"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

