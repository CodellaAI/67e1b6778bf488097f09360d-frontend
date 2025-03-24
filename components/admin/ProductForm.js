
'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Trash2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductForm({ product, categories, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    category: '',
    images: [],
    inStock: true,
    stockQuantity: '1',
    featured: false,
    features: ['']
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        category: product.category?._id || '',
        images: product.images || [],
        inStock: product.inStock ?? true,
        stockQuantity: product.stockQuantity || '1',
        featured: product.featured || false,
        features: product.features || ['']
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    setFormData(prev => ({ ...prev, features: updatedFeatures }))
  }

  const addFeature = () => {
    setFormData(prev => ({ 
      ...prev, 
      features: [...prev.features, ''] 
    }))
  }

  const removeFeature = (index) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures.splice(index, 1)
    setFormData(prev => ({ ...prev, features: updatedFeatures }))
  }

  const handleImageAdd = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // In a real app, you would upload this file to your server/cloud storage
    // and get back a URL. For this example, we'll create a fake URL.
    const imageUrl = URL.createObjectURL(file)
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageUrl]
    }))
    
    // Reset the file input
    e.target.value = null
  }

  const removeImage = (index) => {
    const updatedImages = [...formData.images]
    updatedImages.splice(index, 1)
    setFormData(prev => ({ ...prev, images: updatedImages }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Product name is required')
      return
    }
    
    if (!formData.description.trim()) {
      toast.error('Product description is required')
      return
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      toast.error('Please enter a valid price')
      return
    }
    
    // Filter out empty features
    const filteredFeatures = formData.features.filter(f => f.trim() !== '')
    
    // Prepare the data
    const productData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      stockQuantity: Number(formData.stockQuantity),
      features: filteredFeatures
    }
    
    onSubmit(productData)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {product ? 'Edit Product' : 'Add New Product'}
        </h1>
        <button 
          onClick={onCancel}
          className="btn btn-outline flex items-center"
        >
          <X size={18} className="mr-1" />
          Cancel
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="label">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input min-h-[120px]"
                  placeholder="Enter product description"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="label">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="oldPrice" className="label">Old Price ($) (Optional)</label>
                  <input
                    type="number"
                    id="oldPrice"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    className="input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="label">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="stockQuantity" className="label">Stock Quantity</label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    className="input"
                    min="0"
                    required
                  />
                </div>
                <div className="flex items-center mt-8">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                    In Stock
                  </label>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Featured Product
                </label>
              </div>
            </div>
            
            {/* Features and Images */}
            <div className="space-y-6">
              <div>
                <label className="label">Product Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="input flex-grow"
                      placeholder="e.g. 1500mAh Battery"
                    />
                    {formData.features.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={addFeature}
                  className="mt-2 text-sm text-primary-600 hover:text-primary-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Feature
                </button>
              </div>
              
              <div>
                <label className="label">Product Images</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src={image} 
                          alt={`Product image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-white rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <div className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 cursor-pointer hover:border-primary-500 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      onChange={handleImageAdd}
                      accept="image/*"
                      className="hidden"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer text-center">
                      <Plus size={24} className="mx-auto mb-2 text-gray-400" />
                      <span className="text-sm text-gray-500">Add Image</span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Upload product images (PNG, JPG, WEBP). First image will be used as the main product image.
                </p>
              </div>
              
              {formData.images.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start">
                  <AlertCircle size={18} className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    Please add at least one product image for better visibility.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
            <button 
              type="button"
              onClick={onCancel}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
            >
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
