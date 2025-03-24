
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Filter, 
  ChevronDown,
  Eye,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ProductForm from '@/components/admin/ProductForm'

export default function ProductsManager() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
        ])
        setProducts(productsRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddNew = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`)
      setProducts(products.filter(p => p._id !== productId))
      toast.success('Product deleted successfully')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${editingProduct._id}`, 
          formData
        )
        setProducts(products.map(p => p._id === editingProduct._id ? response.data : p))
        toast.success('Product updated successfully')
      } else {
        // Create new product
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, formData)
        setProducts([...products, response.data])
        toast.success('Product created successfully')
      }
      setShowForm(false)
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    }
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div>
      {showForm ? (
        <ProductForm 
          product={editingProduct} 
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <button 
              onClick={handleAddNew}
              className="btn btn-primary flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Add New Product
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <div className="sm:w-48">
                  <button className="w-full btn btn-outline flex items-center justify-center">
                    <Filter size={18} className="mr-2" />
                    Filter
                    <ChevronDown size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Stock</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                        <AlertCircle size={40} className="mx-auto mb-3 text-gray-300" />
                        No products found. Try a different search term or add a new product.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                              {product.images && product.images.length > 0 ? (
                                <img 
                                  src={product.images[0]} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <AlertCircle size={16} />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description.substring(0, 50)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.category?.name || 'Uncategorized'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          ${product.price?.toFixed(2)}
                          {product.oldPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${product.oldPrice?.toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.stockQuantity || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            product.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => window.open(`/products/${product._id}`, '_blank')}
                              className="p-1 text-gray-500 hover:text-gray-700"
                              title="View product"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => handleEdit(product)}
                              className="p-1 text-blue-500 hover:text-blue-700"
                              title="Edit product"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(product._id)}
                              className="p-1 text-red-500 hover:text-red-700"
                              title="Delete product"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                <button className="px-3 py-1 bg-primary-50 border border-primary-600 text-primary-600 rounded-md text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
