import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { registerSchema } from '@/schemas/auth'

const secret = process.env.JWT_SECRET || 'secret'

// Mock users database (in real app, use database)
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // Validate input
    await registerSchema.validate({ email, password, name })

    // Check if user exists
    if (users.find(u => u.email === email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
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

    return NextResponse.json({ success: true, redirect: '/dashboard' })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}