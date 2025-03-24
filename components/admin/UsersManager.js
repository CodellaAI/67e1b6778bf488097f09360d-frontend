
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Search, 
  User,
  UserPlus,
  ShieldCheck,
  AlertCircle,
  Mail,
  Trash2,
  X,
  Check
} from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function UsersManager() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      
      // In a real app, this would be an actual API call
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUsers = [
        { 
          _id: '1', 
          name: 'John Admin', 
          email: 'admin@example.com', 
          isAdmin: true,
          createdAt: '2023-01-15T10:30:00Z',
          orders: 8
        },
        { 
          _id: '2', 
          name: 'Sarah Smith', 
          email: 'sarah@example.com', 
          isAdmin: false,
          createdAt: '2023-03-22T14:45:00Z',
          orders: 12
        },
        { 
          _id: '3', 
          name: 'Michael Johnson', 
          email: 'michael@example.com', 
          isAdmin: false,
          createdAt: '2023-05-10T09:15:00Z',
          orders: 5
        },
        { 
          _id: '4', 
          name: 'Emily Wilson', 
          email: 'emily@example.com', 
          isAdmin: false,
          createdAt: '2023-07-05T16:20:00Z',
          orders: 3
        },
        { 
          _id: '5', 
          name: 'Robert Brown', 
          email: 'robert@example.com', 
          isAdmin: false,
          createdAt: '2023-09-18T11:40:00Z',
          orders: 0
        }
      ]
      
      setUsers(mockUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      isAdmin: false
    })
    setShowForm(true)
  }

  const handleToggleAdmin = async (userId, currentStatus) => {
    try {
      // In a real app, this would be an actual API call
      // await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, { isAdmin: !currentStatus })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isAdmin: !currentStatus } : user
      ))
      
      toast.success(`User admin status updated`)
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user')
    }
  }

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      // In a real app, this would be an actual API call
      // await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update local state
      setUsers(users.filter(user => user._id !== userId))
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      toast.error('All fields are required')
      return
    }
    
    try {
      // In a real app, this would be an actual API call
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create a mock new user with generated ID
      const newUser = {
        _id: `${users.length + 1}`,
        name: formData.name,
        email: formData.email,
        isAdmin: formData.isAdmin,
        createdAt: new Date().toISOString(),
        orders: 0
      }
      
      setUsers([...users, newUser])
      toast.success('User created successfully')
      setShowForm(false)
    } catch (error) {
      console.error('Error creating user:', error)
      toast.error('Failed to create user')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-bold">Add New User</h1>
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
                    <label htmlFor="name" className="label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="label">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="isAdmin"
                      name="isAdmin"
                      checked={formData.isAdmin}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-700">
                      Grant Admin Privileges
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium mb-4">User Information</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Create a new user account with the information provided. The user will be able to:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Place orders and make purchases
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      View order history and track shipments
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Save favorite products and payment methods
                    </li>
                    {formData.isAdmin && (
                      <li className="flex items-start font-medium text-primary-700 mt-4">
                        <ShieldCheck size={16} className="text-primary-700 mr-2 mt-0.5 flex-shrink-0" />
                        Access admin dashboard and manage site content
                      </li>
                    )}
                  </ul>
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
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Users</h1>
            <button 
              onClick={handleAddNew}
              className="btn btn-primary flex items-center"
            >
              <UserPlus size={18} className="mr-1" />
              Add New User
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search users by name or email..."
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
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Joined</th>
                    <th className="px-6 py-3 text-left">Orders</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                        <AlertCircle size={40} className="mx-auto mb-3 text-gray-300" />
                        No users found. Try a different search term or add a new user.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                              <User size={20} />
                            </div>
                            <div className="ml-4 font-medium">{user.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-gray-500">
                            <Mail size={16} className="mr-2 text-gray-400" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                            {user.orders} orders
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                            className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.isAdmin 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {user.isAdmin && <ShieldCheck size={14} className="mr-1" />}
                            {user.isAdmin ? 'Admin' : 'Customer'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button 
                            onClick={() => handleDelete(user._id)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Delete user"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                <button className="px-3 py-1 bg-primary-50 border border-primary-600 text-primary-600 rounded-md text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
