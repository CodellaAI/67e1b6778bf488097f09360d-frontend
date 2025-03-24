
'use client'

import { useState } from 'react'
import { Save, RefreshCw, CreditCard, Truck, Bell, Globe, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsManager() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Vapor Vault',
    siteDescription: 'Premium vaping products for enthusiasts and beginners',
    contactEmail: 'info@vaporvault.com',
    contactPhone: '(123) 456-7890',
    address: '123 Vape Street, Cloud City, VC 12345',
    logo: '/logo.png'
  })
  
  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    stripePublicKey: 'pk_test_123456789',
    stripeSecretKey: 'sk_test_123456789',
    paypalEnabled: false,
    paypalClientId: '',
    paypalSecretKey: '',
    currency: 'USD'
  })
  
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: '100',
    standardShippingRate: '10',
    expressShippingRate: '25',
    internationalShippingEnabled: true,
    restrictedCountries: ['Cuba', 'Iran', 'North Korea', 'Syria']
  })
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    abandonedCart: true,
    lowStock: true,
    newsletterEnabled: true
  })

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings(prev => ({ ...prev, [name]: value }))
  }
  
  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target
    setPaymentSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target
    setShippingSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings(prev => ({ ...prev, [name]: checked }))
  }

  const handleSave = async () => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Settings saved successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe size={18} /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard size={18} /> },
    { id: 'shipping', label: 'Shipping', icon: <Truck size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="btn btn-primary flex items-center"
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-6 font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="siteName" className="label">Site Name</label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactEmail" className="label">Contact Email</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="label">Contact Phone</label>
                  <input
                    type="text"
                    id="contactPhone"
                    name="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="label">Business Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={generalSettings.address}
                    onChange={handleGeneralChange}
                    className="input"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="siteDescription" className="label">Site Description</label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                    className="input min-h-[100px]"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <label className="label">Site Logo</label>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mr-4">
                      <img 
                        src={generalSettings.logo} 
                        alt="Site Logo" 
                        className="max-w-full max-h-full"
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        id="logo-upload"
                        className="hidden"
                      />
                      <label 
                        htmlFor="logo-upload"
                        className="btn btn-outline text-sm py-2"
                      >
                        Upload New Logo
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended size: 200x200px, PNG or SVG format
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Payment Settings</h2>
              
              <div className="space-y-8">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 9H22V20H2V9Z" stroke="#6772E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 4H22V9H2V4Z" stroke="#6772E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 14H9V16H5V14Z" fill="#6772E5"/>
                        </svg>
                      </div>
                      <h3 className="font-medium">Stripe</h3>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="stripeEnabled"
                        name="stripeEnabled"
                        checked={paymentSettings.stripeEnabled}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="stripeEnabled" className="ml-2 text-sm">
                        Enable
                      </label>
                    </div>
                  </div>
                  
                  {paymentSettings.stripeEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="stripePublicKey" className="label">Public Key</label>
                        <input
                          type="text"
                          id="stripePublicKey"
                          name="stripePublicKey"
                          value={paymentSettings.stripePublicKey}
                          onChange={handlePaymentChange}
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="stripeSecretKey" className="label">Secret Key</label>
                        <input
                          type="password"
                          id="stripeSecretKey"
                          name="stripeSecretKey"
                          value={paymentSettings.stripeSecretKey}
                          onChange={handlePaymentChange}
                          className="input"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 7H6C4.89543 7 4 7.89543 4 9V15C4 16.1046 4.89543 17 6 17H18C19.1046 17 20 16.1046 20 15V9C20 7.89543 19.1046 7 18 7Z" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 12H10M14 12H16" stroke="#003087" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <h3 className="font-medium">PayPal</h3>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="paypalEnabled"
                        name="paypalEnabled"
                        checked={paymentSettings.paypalEnabled}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="paypalEnabled" className="ml-2 text-sm">
                        Enable
                      </label>
                    </div>
                  </div>
                  
                  {paymentSettings.paypalEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="paypalClientId" className="label">Client ID</label>
                        <input
                          type="text"
                          id="paypalClientId"
                          name="paypalClientId"
                          value={paymentSettings.paypalClientId}
                          onChange={handlePaymentChange}
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="paypalSecretKey" className="label">Secret Key</label>
                        <input
                          type="password"
                          id="paypalSecretKey"
                          name="paypalSecretKey"
                          value={paymentSettings.paypalSecretKey}
                          onChange={handlePaymentChange}
                          className="input"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="currency" className="label">Currency</label>
                  <select
                    id="currency"
                    name="currency"
                    value={paymentSettings.currency}
                    onChange={handlePaymentChange}
                    className="input"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="freeShippingThreshold" className="label">Free Shipping Threshold ($)</label>
                  <input
                    type="number"
                    id="freeShippingThreshold"
                    name="freeShippingThreshold"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={handleShippingChange}
                    className="input"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Set to 0 to disable free shipping
                  </p>
                </div>
                
                <div>
                  <label htmlFor="standardShippingRate" className="label">Standard Shipping Rate ($)</label>
                  <input
                    type="number"
                    id="standardShippingRate"
                    name="standardShippingRate"
                    value={shippingSettings.standardShippingRate}
                    onChange={handleShippingChange}
                    className="input"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label htmlFor="expressShippingRate" className="label">Express Shipping Rate ($)</label>
                  <input
                    type="number"
                    id="expressShippingRate"
                    name="expressShippingRate"
                    value={shippingSettings.expressShippingRate}
                    onChange={handleShippingChange}
                    className="input"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="flex items-center mt-8">
                  <input
                    type="checkbox"
                    id="internationalShippingEnabled"
                    name="internationalShippingEnabled"
                    checked={shippingSettings.internationalShippingEnabled}
                    onChange={handleShippingChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="internationalShippingEnabled" className="ml-2 text-sm">
                    Enable International Shipping
                  </label>
                </div>
                
                <div className="md:col-span-2">
                  <label className="label">Restricted Countries</label>
                  <div className="flex flex-wrap gap-2">
                    {shippingSettings.restrictedCountries.map((country, index) => (
                      <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                        {country}
                        <button className="ml-2 text-gray-500 hover:text-gray-700">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder="Add country..."
                      className="border-b border-gray-300 bg-transparent py-1 text-sm focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    These countries will not be available during checkout
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Customer Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="orderConfirmation"
                        name="orderConfirmation"
                        checked={notificationSettings.orderConfirmation}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="orderConfirmation" className="ml-2 text-sm">
                        Order Confirmation
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="orderShipped"
                        name="orderShipped"
                        checked={notificationSettings.orderShipped}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="orderShipped" className="ml-2 text-sm">
                        Order Shipped
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="orderDelivered"
                        name="orderDelivered"
                        checked={notificationSettings.orderDelivered}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="orderDelivered" className="ml-2 text-sm">
                        Order Delivered
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="abandonedCart"
                        name="abandonedCart"
                        checked={notificationSettings.abandonedCart}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="abandonedCart" className="ml-2 text-sm">
                        Abandoned Cart Reminder
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Admin Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lowStock"
                        name="lowStock"
                        checked={notificationSettings.lowStock}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="lowStock" className="ml-2 text-sm">
                        Low Stock Alerts
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletter</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Configure newsletter signup and delivery settings
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newsletterEnabled"
                        name="newsletterEnabled"
                        checked={notificationSettings.newsletterEnabled}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="newsletterEnabled" className="ml-2 text-sm">
                        Enable
                      </label>
                    </div>
                  </div>
                  
                  {notificationSettings.newsletterEnabled && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="mailchimpApiKey" className="label">Mailchimp API Key</label>
                        <input
                          type="password"
                          id="mailchimpApiKey"
                          className="input"
                          placeholder="Enter API key"
                        />
                      </div>
                      <div>
                        <label htmlFor="mailchimpListId" className="label">Audience ID</label>
                        <input
                          type="text"
                          id="mailchimpListId"
                          className="input"
                          placeholder="e.g. abc123def"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
                  <Mail size={18} className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Email Template Settings</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Customize the appearance and content of notification emails in the Email Templates section.
                    </p>
                    <button className="text-sm text-blue-700 font-medium mt-2 hover:text-blue-800">
                      Go to Email Templates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
