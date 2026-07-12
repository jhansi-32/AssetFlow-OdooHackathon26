import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// Placeholder auth state for scaffold purposes.
// Wire this up to your real auth/session logic (JWT, cookie session, SSO, etc.)
const DEMO_USER: User = {
  id: 'usr_001',
  name: 'Aiden Cole',
  email: 'aiden.cole@assetflow.io',
  role: 'Operations Manager',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO_USER)

  const login = (u: User) => setUser(u)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
