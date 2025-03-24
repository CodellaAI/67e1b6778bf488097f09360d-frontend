
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  AlertCircle,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function CategoriesManager() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setFormData({
      name: '',
      description: '',
      image: ''
    })
    setEditingCategory(null)
    setShowForm(true)
  }

  const handleEdit = (category) => {
    setFormData({
      name: category.name || '',
      description: category.description || '',
      image: category.image || ''
    })
    setEditingCategory(category)
    setShowForm(true)
  }

  const handleDelete = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`)
      setCategories(categories.filter(c => c._id !== categoryId))
      toast.success('Category deleted successfully')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // In a real app, you would upload this file to your server/cloud storage
    // and get back a URL. For this example, we'll create a fake URL.
    const imageUrl = URL.createObjectURL(file)
    setFormData(prev => ({ ...prev, image: imageUrl }))
    
    // Reset the file input
    e.target.value = null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Category name is required')
      return
    }
    
    try {
      if (editingCategory) {
        // Update existing category
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${editingCategory._id}`, 
          formData
        )
        setCategories(categories.map(c => c._id === editingCategory._id ? response.data : c))
        toast.success('Category updated successfully')
      } else {
        // Create new category
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, formData)
        setCategories([...categories, response.data])
        toast.success('Category created successfully')
      }
      setShowForm(false)
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error('Failed to save category')
    }
  }

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h1>
            <button 
              onClick={() => setShowForm(false)}
              className="btn btn-outline flex items-center"
            >
              <X size={18} className="mr-1" />
              Cancel
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label">Category Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="label">Description (Optional)</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="input min-h-[120px]"
                      placeholder="Enter category description"
                    ></textarea>
                  </div>
                </div>
                
                <div>
                  <label className="label">Category Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    {formData.image ? (
                      <div className="relative">
                        <img 
                          src={formData.image} 
                          alt="Category preview" 
                          className="max-h-48 mx-auto rounded-md"
                        />
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="absolute top-1 right-1 p-1 bg-white rounded-full text-red-500 shadow-sm"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <input
                          type="file"
                          id="image-upload"
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Plus size={36} className="text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Upload Image</span>
                            <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (Max 2MB)</span>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Categories</h1>
            <button 
              onClick={handleAddNew}
              className="btn btn-primary flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Add New Category
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Products</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                        <AlertCircle size={40} className="mx-auto mb-3 text-gray-300" />
                        No categories found. Try a different search term or add a new category.
                      </td>
                    </tr>
                  ) : (
                    filteredCategories.map((category) => (
                      <tr key={category._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                              {category.image ? (
                                <img 
                                  src={category.image} 
                                  alt={category.name} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <AlertCircle size={16} />
                                </div>
                              )}
                            </div>
                            <div className="ml-4 font-medium text-gray-900">{category.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {category.description ? (
                            <span className="truncate block max-w-xs">
                              {category.description.substring(0, 100)}
                              {category.description.length > 100 ? '...' : ''}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">No description</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                            {category.productCount || 0} products
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => handleEdit(category)}
                              className="p-1 text-blue-500 hover:text-blue-700"
                              title="Edit category"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(category._id)}
                              className="p-1 text-red-500 hover:text-red-700"
                              title="Delete category"
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
          </div>
        </>
      )}
    </div>
  )
}
