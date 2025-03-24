
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // In a real app, these would be actual API calls
        // const statsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`)
        // const ordersResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/recent`)
        
        // Simulating API responses
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setStats({
          revenue: 12589.50,
          orders: 156,
          customers: 87,
          products: 42,
          revenueChange: 12.5,
          ordersChange: 8.3,
          customersChange: 15.2,
          productsChange: -3.1
        })
        
        setRecentOrders([
          { 
            id: 'ORD-1234', 
            customer: 'John Doe', 
            date: '2023-12-10T14:32:00Z', 
            total: 129.99, 
            status: 'completed',
            items: 3
          },
          { 
            id: 'ORD-1233', 
            customer: 'Sarah Smith', 
            date: '2023-12-09T09:15:00Z', 
            total: 89.50, 
            status: 'processing',
            items: 2
          },
          { 
            id: 'ORD-1232', 
            customer: 'Michael Johnson', 
            date: '2023-12-08T16:45:00Z', 
            total: 210.75, 
            status: 'completed',
            items: 4
          },
          { 
            id: 'ORD-1231', 
            customer: 'Emily Wilson', 
            date: '2023-12-07T11:20:00Z', 
            total: 65.25, 
            status: 'shipped',
            items: 1
          },
          { 
            id: 'ORD-1230', 
            customer: 'Robert Brown', 
            date: '2023-12-06T13:10:00Z', 
            total: 145.80, 
            status: 'completed',
            items: 3
          }
        ])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">${stats.revenue.toFixed(2)}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="text-green-600" size={20} />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm ${stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.revenueChange >= 0 ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            <span>{Math.abs(stats.revenueChange)}% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{stats.orders}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingBag className="text-blue-600" size={20} />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm ${stats.ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.ordersChange >= 0 ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            <span>{Math.abs(stats.ordersChange)}% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Customers</p>
              <h3 className="text-2xl font-bold mt-1">{stats.customers}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="text-purple-600" size={20} />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm ${stats.customersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.customersChange >= 0 ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            <span>{Math.abs(stats.customersChange)}% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Products</p>
              <h3 className="text-2xl font-bold mt-1">{stats.products}</h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <Package className="text-amber-600" size={20} />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm ${stats.productsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.productsChange >= 0 ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            <span>{Math.abs(stats.productsChange)}% from last month</span>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
              View All
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1 text-gray-400" />
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Sales Overview Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Sales Overview</h2>
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        
        <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50">
          <div className="text-center text-gray-500">
            <TrendingUp size={48} className="mx-auto mb-3 text-gray-300" />
            <p>Sales chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
