
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '@/contexts/CartContext'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import RelatedProducts from '@/components/products/RelatedProducts'
import ProductTabs from '@/components/products/ProductTabs'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    toast.success(`${product.name} added to cart!`)
    
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0 && value <= 10) {
      setQuantity(value)
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-20 min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => router.push('/products')}
          className="btn btn-primary"
        >
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
            <Image 
              src={product.images[activeImage] || '/images/placeholder.png'} 
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-primary-500 scale-105' : 'border-gray-200'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>{product.category?.name || 'Vape'}</span>
              <span>•</span>
              <div className="flex items-center">
                <Star className="fill-yellow-400 text-yellow-400 w-4 h-4 mr-1" />
                <span>{product.rating || '4.5'} ({product.reviewCount || '24'} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          <p className="text-gray-600">{product.description}</p>
          
          <div className="space-y-4 py-4 border-t border-b border-gray-200">
            {/* Availability */}
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={18} />
              <span className="text-sm font-medium">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {/* Features/Specs */}
            {product.features && (
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32">
                <label htmlFor="quantity" className="label">Quantity</label>
                <input 
                  type="number" 
                  id="quantity"
                  min="1" 
                  max="10" 
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="input"
                />
              </div>
              
              <div className="flex-grow">
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full btn ${!product.inStock ? 'bg-gray-300 cursor-not-allowed' : addedToCart ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'}`}
                >
                  {!product.inStock ? 'Out of Stock' : 
                    addedToCart ? (
                      <>
                        <Check size={18} className="mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                      </>
                    )
                  }
                </button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart size={18} />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs product={product} />
      
      <div className="mt-20">
        <RelatedProducts categoryId={product.category?._id} currentProductId={product._id} />
      </div>
    </div>
  )
}
