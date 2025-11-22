import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'secret'

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/create') ||
      request.nextUrl.pathname.startsWith('/edit')) {
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      jwt.verify(token, secret)
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && token) {
    try {
      jwt.verify(token, secret)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch {
      // Invalid token, continue to login/register
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/create/:path*', '/edit/:path*', '/login', '/register']
}