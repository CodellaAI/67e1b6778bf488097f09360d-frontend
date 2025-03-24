
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, AlertCircle } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.inStock) {
      toast.error('This product is currently out of stock')
      return
    }
    
    addToCart(product, 1)
    toast.success(`${product.name} added to cart!`)
  }
  
  return (
    <Link href={`/products/${product._id}`}>
      <div 
        className="card h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image 
            src={product.images?.[0] || '/images/placeholder.png'} 
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          
          {/* Sale Badge */}
          {product.salePrice && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Sale
            </span>
          )}
          
          {/* Out of Stock Badge */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-md flex items-center">
                <AlertCircle size={16} className="text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-500">Out of Stock</span>
              </div>
            </div>
          )}
          
          {/* Quick Actions */}
          <div 
            className={`absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm transition-all duration-300 flex justify-between ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`}
          >
            <button 
              onClick={handleAddToCart}
              className={`flex-1 py-2 text-sm font-medium text-center rounded ${
                product.inStock 
                  ? 'bg-primary-600 text-white hover:bg-primary-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!product.inStock}
            >
              <ShoppingCart size={16} className="inline mr-1" />
              Add to Cart
            </button>
            <button className="ml-2 p-2 bg-gray-100 rounded hover:bg-gray-200">
              <Heart size={16} />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-1 flex items-center">
            <span className="text-xs text-gray-500">{product.category?.name || 'Vape'}</span>
            <div className="ml-auto flex items-center">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-500 ml-1">{product.rating || '4.5'}</span>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
          
          <div className="mt-auto pt-2 flex items-baseline">
            <span className="text-lg font-bold text-gray-900">${product.price?.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${product.oldPrice?.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
