
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Search, 
  Filter, 
  ChevronDown, 
  AlertCircle,
  Eye,
  Clock,
  Download
} from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function OrdersManager() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      
      // In a real app, this would be an actual API call
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)
      
      // Simulating API response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockOrders = [
        { 
          _id: 'ORD-1234', 
          customer: { name: 'John Doe', email: 'john@example.com' }, 
          date: '2023-12-10T14:32:00Z', 
          total: 129.99, 
          status: 'completed',
          items: [
            { product: { name: 'Vape Device X' }, quantity: 1, price: 89.99 },
            { product: { name: 'E-Liquid Pack' }, quantity: 2, price: 20.00 }
          ],
          shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA'
          },
          paymentMethod: 'Credit Card'
        },
        { 
          _id: 'ORD-1233', 
          customer: { name: 'Sarah Smith', email: 'sarah@example.com' }, 
          date: '2023-12-09T09:15:00Z', 
          total: 89.50, 
          status: 'processing',
          items: [
            { product: { name: 'Pod System Y' }, quantity: 1, price: 59.50 },
            { product: { name: 'Coil Pack' }, quantity: 3, price: 10.00 }
          ],
          shippingAddress: {
            street: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90001',
            country: 'USA'
          },
          paymentMethod: 'PayPal'
        },
        { 
          _id: 'ORD-1232', 
          customer: { name: 'Michael Johnson', email: 'michael@example.com' }, 
          date: '2023-12-08T16:45:00Z', 
          total: 210.75, 
          status: 'shipped',
          items: [
            { product: { name: 'Premium Vape Kit' }, quantity: 1, price: 159.99 },
            { product: { name: 'Battery Pack' }, quantity: 1, price: 30.99 },
            { product: { name: 'E-Liquid Bundle' }, quantity: 1, price: 19.77 }
          ],
          shippingAddress: {
            street: '789 Pine St',
            city: 'Chicago',
            state: 'IL',
            zip: '60007',
            country: 'USA'
          },
          paymentMethod: 'Credit Card'
        },
        { 
          _id: 'ORD-1231', 
          customer: { name: 'Emily Wilson', email: 'emily@example.com' }, 
          date: '2023-12-07T11:20:00Z', 
          total: 65.25, 
          status: 'cancelled',
          items: [
            { product: { name: 'Disposable Vape' }, quantity: 5, price: 13.05 }
          ],
          shippingAddress: {
            street: '101 Maple Rd',
            city: 'Houston',
            state: 'TX',
            zip: '77001',
            country: 'USA'
          },
          paymentMethod: 'PayPal'
        },
        { 
          _id: 'ORD-1230', 
          customer: { name: 'Robert Brown', email: 'robert@example.com' }, 
          date: '2023-12-06T13:10:00Z', 
          total: 145.80, 
          status: 'completed',
          items: [
            { product: { name: 'Advanced Mod Kit' }, quantity: 1, price: 129.99 },
            { product: { name: 'Drip Tip Set' }, quantity: 1, price: 15.81 }
          ],
          shippingAddress: {
            street: '202 Cedar Ln',
            city: 'Miami',
            state: 'FL',
            zip: '33101',
            country: 'USA'
          },
          paymentMethod: 'Credit Card'
        }
      ]
      
      setOrders(mockOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // In a real app, this would be an actual API call
      // await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, { status: newStatus })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ))
      
      toast.success(`Order ${orderId} status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error('Failed to update order status')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = orders.filter(order => {
    // Filter by search term
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filter by status
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button className="btn btn-outline flex items-center">
          <Download size={18} className="mr-1" />
          Export Orders
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search orders by ID, customer..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input"
              >
                <option value="all">All Statuses</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    <AlertCircle size={40} className="mx-auto mb-3 text-gray-300" />
                    No orders found. Try a different search term or filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-xs rounded-full px-3 py-1 border-0 ${getStatusColor(order.status)}`}
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700"
                        title="View order details"
                      >
                        <Eye size={18} />
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
            Showing {filteredOrders.length} of {orders.length} orders
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
    </div>
  )
}
