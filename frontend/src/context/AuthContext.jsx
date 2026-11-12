import { createContext, useContext, useState } from 'react'
import { loginApi } from '../services/api'

const CREDENTIALS_FALLBACK = [
  { email: 'admin@fon.bg.ac.rs', password: 'admin123', role: 'admin', name: 'Administrator' },
  { email: 'profesor@fon.bg.ac.rs', password: 'profesor123', role: 'profesor', name: 'Prof. Marković' },
  { email: 'profesor@fon.bg.ac.rs', password: 'prof123', role: 'profesor', name: 'Prof. Marković' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedToken = localStorage.getItem('infon_token')
      // Ako je zaostao stari mock token, očisti ga da se prijavi na pravi backend
      if (storedToken === 'demo-token-fallback') {
        localStorage.removeItem('infon_user')
        localStorage.removeItem('infon_token')
        return null
      }
      const stored = localStorage.getItem('infon_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('infon_token')
    if (stored === 'demo-token-fallback') return ''
    return stored || ''
  })

  const login = async (email, password) => {
    try {
      // Pokušaj prijavu preko pravog Backend API-ja
      const data = await loginApi(email, password)
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('infon_user', JSON.stringify(data.user))
      localStorage.setItem('infon_token', data.token)
      return { success: true }
    } catch (err) {
      console.warn('Backend login error, checking fallback demo creds:', err.message)
      // Fallback ako backend trenutno nije dostupan ili je drugačija lozinka
      const match = CREDENTIALS_FALLBACK.find(
        (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
      )
      if (match) {
        const userData = { email: match.email, role: match.role, name: match.name }
        setUser(userData)
        setToken('demo-token-fallback')
        localStorage.setItem('infon_user', JSON.stringify(userData))
        localStorage.setItem('infon_token', 'demo-token-fallback')
        return { success: true }
      }
      return { success: false, message: err.message || 'Pogrešan email ili lozinka.' }
    }
  }

  const logout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('infon_user')
    localStorage.removeItem('infon_token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
