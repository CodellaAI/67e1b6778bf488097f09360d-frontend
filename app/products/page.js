
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '@/components/products/ProductCard'
import ProductFilters from '@/components/products/ProductFilters'
import { Search, SlidersHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'newest'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
        ])
        setProducts(productsRes.data)
        setFilteredProducts(productsRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchQuery, activeFilters, products])

  const applyFilters = () => {
    let result = [...products]
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply category filter
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category._id)
      )
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= activeFilters.minPrice && 
      product.price <= activeFilters.maxPrice
    )
    
    // Apply sorting
    switch (activeFilters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity)
        break
      default:
        break
    }
    
    setFilteredProducts(result)
  }

  const handleFilterChange = (newFilters) => {
    setActiveFilters({...activeFilters, ...newFilters})
  }

  if (loading) {
    return (
      <div className="container-custom py-20 min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explore Our Products</h1>
        <p className="text-gray-600 max-w-3xl">
          Discover our premium selection of vaping products, from sleek devices to delicious e-liquids. 
          Find the perfect match for your vaping journey.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button 
          className="ml-4 btn btn-outline flex items-center gap-2 md:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <ProductFilters 
            categories={categories} 
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        <div className="md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
