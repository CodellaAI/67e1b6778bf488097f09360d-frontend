
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token')
      
      if (token) {
        try {
          // Set the auth token in axios headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Verify token and get user data
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`)
          
          setUser(response.data)
          setIsAdmin(response.data.isAdmin)
        } catch (error) {
          console.error('Authentication error:', error)
          Cookies.remove('token')
          delete axios.defaults.headers.common['Authorization']
        }
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      email,
      password
    })
    
    const { token, user } = response.data
    
    // Set token in cookie
    Cookies.set('token', token, { expires: 7 }) // Expires in 7 days
    
    // Set the auth token in axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    setUser(user)
    setIsAdmin(user.isAdmin)
    
    return user
  }

  const register = async (name, email, password) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      name,
      email,
      password
    })
    
    return response.data
  }

  const logout = () => {
    // Remove token from cookie
    Cookies.remove('token')
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization']
    
    // Clear user state
    setUser(null)
    setIsAdmin(false)
  }

  const checkAdminStatus = async () => {
    if (!user) return false
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/admin-check`)
      setIsAdmin(response.data.isAdmin)
      return response.data.isAdmin
    } catch (error) {
      console.error('Admin check error:', error)
      setIsAdmin(false)
      return false
    }
  }

  const value = {
    user,
    isAdmin,
    loading,
    login,
    register,
    logout,
    checkAdminStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
