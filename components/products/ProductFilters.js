
'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'

export default function ProductFilters({ categories, activeFilters, onFilterChange }) {
  const [priceRange, setPriceRange] = useState([activeFilters.minPrice, activeFilters.maxPrice])
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sort: true
  })

  useEffect(() => {
    setPriceRange([activeFilters.minPrice, activeFilters.maxPrice])
  }, [activeFilters.minPrice, activeFilters.maxPrice])

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange]
    newRange[index] = value
    setPriceRange(newRange)
  }

  const applyPriceFilter = () => {
    onFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    })
  }

  const handleCategoryChange = (categoryId) => {
    let newCategories = [...activeFilters.categories]
    
    if (newCategories.includes(categoryId)) {
      newCategories = newCategories.filter(id => id !== categoryId)
    } else {
      newCategories.push(categoryId)
    }
    
    onFilterChange({ categories: newCategories })
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'newest'
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <SlidersHorizontal size={18} className="mr-2 text-gray-500" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        
        {(activeFilters.categories.length > 0 || 
          activeFilters.minPrice > 0 || 
          activeFilters.maxPrice < 1000) && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
          >
            <X size={14} className="mr-1" />
            Clear All
          </button>
        )}
      </div>
      
      {/* Categories */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button 
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="font-medium">Categories</h3>
          <ChevronDown 
            size={18} 
            className={`transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category._id}`}
                  checked={activeFilters.categories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label 
                  htmlFor={`category-${category._id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button 
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="font-medium">Price Range</h3>
          <ChevronDown 
            size={18} 
            className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {expandedSections.price && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-[45%]">
                <label htmlFor="min-price" className="block text-sm text-gray-500 mb-1">Min</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="min-price"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                    className="input pl-7"
                  />
                </div>
              </div>
              <div className="text-gray-400">—</div>
              <div className="w-[45%]">
                <label htmlFor="max-price" className="block text-sm text-gray-500 mb-1">Max</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="max-price"
                    min={priceRange[0]}
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                    className="input pl-7"
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={applyPriceFilter}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
            >
              Apply
            </button>
          </div>
        )}
      </div>
      
      {/* Sort By */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('sort')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="font-medium">Sort By</h3>
          <ChevronDown 
            size={18} 
            className={`transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {expandedSections.sort && (
          <div className="space-y-2">
            {[
              { id: 'newest', label: 'Newest' },
              { id: 'price-asc', label: 'Price: Low to High' },
              { id: 'price-desc', label: 'Price: High to Low' },
              { id: 'popularity', label: 'Popularity' }
            ].map(option => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={`sort-${option.id}`}
                  name="sort"
                  checked={activeFilters.sortBy === option.id}
                  onChange={() => onFilterChange({ sortBy: option.id })}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label 
                  htmlFor={`sort-${option.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
