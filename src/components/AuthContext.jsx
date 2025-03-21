import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [credits, setCredits] = useState(0)
  const [history, setHistory] = useState([])

  const login = (email, password) => {
    // Simulate authentication
    setUser({ email })
    setCredits(5) // Give new users 5 credits
  }

  const logout = () => {
    setUser(null)
    setCredits(0)
    setHistory([])
  }

  const addToHistory = (imageInfo) => {
    setHistory(prev => [...prev, { ...imageInfo, date: new Date().toISOString() }])
  }

  const useCredit = () => {
    if (credits > 0) {
      setCredits(prev => prev - 1)
      return true
    }
    return false
  }

  const value = {
    user,
    credits,
    history,
    login,
    logout,
    useCredit,
    addToHistory
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}