'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_EMAIL = 'admin@bellamoda.com'
const ADMIN_PASSWORD = 'admin123'

export function AuthProvider({ children }: { children: ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAuth = localStorage.getItem('admin-auth')

    if (storedAuth === 'true') {
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

  const login = (email: string, password: string): boolean => {

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

      localStorage.setItem('admin-auth', 'true')
      setIsAuthenticated(true)

      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem('admin-auth')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
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