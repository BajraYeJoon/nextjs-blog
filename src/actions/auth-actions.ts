'use server'

import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { loginSchema } from '@/schemas/auth'
import { registerSchema } from '@/schemas/auth'

const secret = process.env.JWT_SECRET || 'secret'

// Mock users database
const users: any[] = [
  { id: '1', email: 'admin@test.com', password: 'password', name: 'Admin User' },
  { id: '2', email: 'user@test.com', password: 'password', name: 'Test User' }
]

export interface AuthResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

/**
 * Server Action: Login user
 * Validates credentials, creates JWT token, and sets httpOnly cookie
 */
export async function loginAction(email: string, password: string): Promise<AuthResponse> {
  try {
    // Validate input
    await loginSchema.validate({ email, password })

    // Find user
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      console.log('❌ Login failed: Invalid credentials for email:', email)
      return {
        success: false,
        error: 'Invalid email or password',
        message: 'Invalid email or password'
      }
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: '24h' }
    )

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400 // 24 hours
    })

    console.log('✅ Login successful for user:', user.email, '| User ID:', user.id)
    return {
      success: true,
      message: 'Login successful',
      data: { id: user.id, email: user.email, name: user.name }
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      console.log('❌ Validation error:', error.message)
      return {
        success: false,
        error: error.message,
        message: error.message
      }
    }
    console.log('❌ Login error:', error.message)
    return {
      success: false,
      error: 'Login failed',
      message: 'Login failed'
    }
  }
}

/**
 * Server Action: Register new user
 * Validates input, creates new user, generates JWT token, and sets httpOnly cookie
 */
export async function registerAction(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    // Validate input
    await registerSchema.validate({ email, password, name })

    // Check if user exists
    if (users.find(u => u.email === email)) {
      console.log('❌ Registration failed: Email already exists:', email)
      return {
        success: false,
        error: 'Email already registered',
        message: 'Email already registered'
      }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name
    }
    users.push(newUser)

    // Create JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      secret,
      { expiresIn: '24h' }
    )

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400
    })

    console.log('✅ Registration successful for user:', newUser.email, '| User ID:', newUser.id, '| Name:', newUser.name)
    return {
      success: true,
      message: 'Registration successful',
      data: { id: newUser.id, email: newUser.email, name: newUser.name }
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      console.log('❌ Validation error:', error.message)
      return {
        success: false,
        error: error.message,
        message: error.message
      }
    }
    console.log('❌ Registration error:', error.message)
    return {
      success: false,
      error: 'Registration failed',
      message: 'Registration failed'
    }
  }
}

/**
 * Server Action: Logout user
 * Clears the authentication token cookie
 */
export async function logoutAction(): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('token')

    console.log('✅ Logout successful')
    return {
      success: true,
      message: 'Logout successful'
    }
  } catch (error: any) {
    console.log('❌ Logout error:', error.message)
    return {
      success: false,
      error: 'Logout failed',
      message: 'Logout failed'
    }
  }
}
