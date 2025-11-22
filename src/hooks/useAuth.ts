'use client'
import { useAuth as useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import { LoginCredentials, RegisterCredentials } from '@/types/auth'

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore()
  const router = useRouter()

  const handleLogin = async (credentials: LoginCredentials) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    
    const data = await res.json()
    if (res.ok) {
      login(data.user)
      router.push('/dashboard')
      return { success: true }
    }
    return { error: data.error }
  }

  const handleRegister = async (credentials: RegisterCredentials) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    
    const data = await res.json()
    if (res.ok) {
      login(data.user)
      router.push('/dashboard')
      return { success: true }
    }
    return { error: data.error }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    logout()
    router.push('/')
  }

  return {
    user,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout
  }
}