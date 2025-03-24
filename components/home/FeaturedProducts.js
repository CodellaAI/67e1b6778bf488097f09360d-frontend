
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/featured`)
        setProducts(response.data.slice(0, 4))
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our handpicked collection of premium vaping products, selected for their exceptional quality and popularity.
            </p>
          </div>
          <Link 
            href="/products" 
            className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
            <ArrowRight size={18} className="ml-1" />
          </Link>
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
