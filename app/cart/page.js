
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Trash2, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to checkout')
      router.push('/login?redirect=cart')
      return
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      setLoading(true)
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
        items: cart,
        shipping: {
          name: user.name,
          email: user.email
        }
      })
      
      const { sessionId } = response.data
      
      // Redirect to Stripe checkout
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Error during checkout:', error)
      toast.error('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container-custom py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <ShoppingBag size={64} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link href="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      <Image 
                        src={item.image || '/images/placeholder.png'} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <span className="sm:hidden text-gray-500 mr-2">Price:</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-l border border-gray-300 bg-gray-50"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        max="10" 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="w-10 h-8 border-t border-b border-gray-300 text-center"
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-r border border-gray-300 bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-between sm:justify-center">
                    <span className="sm:hidden text-gray-500 mr-2">Total:</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 ml-4 sm:ml-6 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              <button 
                onClick={() => router.push('/products')}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                Continue Shopping
              </button>
              <button 
                onClick={clearCart}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary-600">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full btn btn-primary flex justify-center items-center"
              >
                {loading ? 'Processing...' : (
                  <>
                    Proceed to Checkout
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
              
              <div className="text-xs text-gray-500 flex items-start gap-2">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <p>
                  By proceeding to checkout, you agree to our terms and conditions and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
