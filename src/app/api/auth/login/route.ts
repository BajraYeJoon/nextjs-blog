import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { loginSchema } from '@/schemas/auth'

const secret = process.env.JWT_SECRET || 'secret'

// Mock users database
const users = [
  { id: '1', email: 'admin@test.com', password: 'password', name: 'Admin User' },
  { id: '2', email: 'user@test.com', password: 'password', name: 'Test User' }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    await loginSchema.validate({ email, password })

    // Find user
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
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

    return NextResponse.json({ success: true, redirect: '/dashboard' })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}