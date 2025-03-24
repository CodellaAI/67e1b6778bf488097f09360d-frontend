
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

export default function CategoryShowcase() {
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
        setCategories(response.data.slice(0, 5))
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Use fallback categories if API fails
        setCategories(fallbackCategories)
      }
    }
    
    fetchCategories()
  }, [])
  
  // Fallback categories in case API fails
  const fallbackCategories = [
    {
      _id: '1',
      name: 'Vape Devices',
      image: 'https://images.unsplash.com/photo-1560706980-0e7b1f4856b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      slug: 'vape-devices'
    },
    {
      _id: '2',
      name: 'E-Liquids',
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      slug: 'e-liquids'
    },
    {
      _id: '3',
      name: 'Pod Systems',
      image: 'https://images.unsplash.com/photo-1563262924-641a8b3d397f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      slug: 'pod-systems'
    },
    {
      _id: '4',
      name: 'Disposables',
      image: 'https://images.unsplash.com/photo-1563262924-641a8b3d397f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      slug: 'disposables'
    },
    {
      _id: '5',
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1560706980-0e7b1f4856b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      slug: 'accessories'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of vaping products, organized into categories to help you find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link 
              key={category._id} 
              href={`/products?category=${category.slug || category._id}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={category.image || '/images/category-placeholder.jpg'}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <span className="mt-1 inline-block text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
