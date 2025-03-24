
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminDashboard from '@/components/admin/AdminDashboard'
import ProductsManager from '@/components/admin/ProductsManager'
import CategoriesManager from '@/components/admin/CategoriesManager'
import OrdersManager from '@/components/admin/OrdersManager'
import UsersManager from '@/components/admin/UsersManager'
import SettingsManager from '@/components/admin/SettingsManager'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const { user, isAdmin, checkAdminStatus } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setLoading(true)
        const isUserAdmin = await checkAdminStatus()
        
        if (!isUserAdmin) {
          toast.error('You do not have permission to access this page')
          router.push('/')
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        toast.error('Authentication error')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    if (!user) {
      toast.error('Please sign in to access admin panel')
      router.push('/login?redirect=admin')
      return
    }

    checkAdmin()
  }, [user, router, checkAdminStatus])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!isAdmin) {
    return null // Will redirect in useEffect
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />
      case 'products':
        return <ProductsManager />
      case 'categories':
        return <CategoriesManager />
      case 'orders':
        return <OrdersManager />
      case 'users':
        return <UsersManager />
      case 'settings':
        return <SettingsManager />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {renderActiveTab()}
      </div>
    </div>
  )
}
