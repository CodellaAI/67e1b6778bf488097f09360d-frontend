
'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Thank you for subscribing!')
      setEmail('')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter for exclusive deals, new product announcements, and vaping tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-white text-primary-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              {loading ? 'Subscribing...' : (
                <>
                  Subscribe
                  <Send size={16} className="ml-2" />
                </>
              )}
            </button>
          </form>
          
          <p className="mt-4 text-sm text-primary-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
