"use client"

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    // This would normally check with your auth provider
    const checkUser = async () => {
      try {
        // Mock auth check - replace with actual auth logic
        const storedUser = localStorage.getItem("healthtrackr-user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  // Mock login function - replace with actual auth logic
  const login = async (email, password) => {
    setLoading(true)
    try {
      // Mock successful login
      const mockUser = {
        id: "user-1",
        name: "John Doe",
        email,
      }

      // Store user in localStorage (for demo purposes only)
      localStorage.setItem("healthtrackr-user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Mock register function - replace with actual auth logic
  const register = async (name, email, password) => {
    setLoading(true)
    try {
      // Mock successful registration
      const mockUser = {
        id: "user-" + Date.now(),
        name,
        email,
      }

      // Store user in localStorage (for demo purposes only)
      localStorage.setItem("healthtrackr-user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("healthtrackr-user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}
