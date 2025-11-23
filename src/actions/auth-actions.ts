'use server'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { loginSchema } from '@/schemas/auth'
import { registerSchema } from '@/schemas/auth'

const secret = process.env.JWT_SECRET ?? 'secret'

//test
const users: any[] = [
  { 
    id: '1', 
    email: 'admin@test.com',
    password: '$2b$10$ubDV.4NTXUBtnrHvP0kqw.i7REGf6aJJu5O6C2.54pCjC9yLcu4uC',
    name: 'Admin User' 
  },
]

export interface AuthResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

// login actions
export async function loginAction(email: string, password: string) {

  await loginSchema.validate({ email, password })

  const user = users.find(u => u.email === email)
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    secret,
    { expiresIn: '24h' }
  )

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400,
  })

  console.log('Login successful:', user.email)
  return {
    message: 'Login successful',
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  }
}


// register action
export async function registerAction(
  name: string,
  email: string,
  password: string
) {
 
  await registerSchema.validate({ email, password, name })

  if (users.find(u => u.email === email)) {
    throw new Error('Email already registered')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    name,
  }
  users.push(newUser)

  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    secret,
    { expiresIn: '24h' }
  )

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400,
  })

  console.log('Registration successful:', newUser.email)

  return {
    message: 'Registration successful',
    data: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  }
}


// log out action
export async function logoutAction() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('token')

    return {
      message: 'Logout successful'
    }
  } catch (err) {
    console.log('Logout error:', err)
    throw new Error('Logout failed')
  }
}

