
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function TrendingProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('new')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        
        if (activeTab === 'new') {
          endpoint += '/new'
        } else if (activeTab === 'bestsellers') {
          endpoint += '/bestsellers'
        } else if (activeTab === 'sale') {
          endpoint += '/sale'
        }
        
        const response = await axios.get(endpoint)
        setProducts(response.data.slice(0, 4))
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [activeTab])

  const tabs = [
    { id: 'new', label: 'New Arrivals' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'sale', label: 'On Sale' }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-600 max-w-2xl">
              Stay up to date with the latest and most popular products in our collection.
            </p>
          </div>
          <Link 
            href="/products" 
            className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
          >
            View All
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>

        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            <div className="mt-10 text-center md:hidden">
              <Link href="/products" className="btn btn-outline">
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
