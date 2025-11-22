import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { Button } from '@/components/ui/button'

const secret = process.env.JWT_SECRET || 'secret'

async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) return null
  
  try {
    const decoded = jwt.verify(token, secret) as any
    return { name: 'User', email: decoded.email }
  } catch {
    return null
  }
}

export default async function Header() {
  const user = await getUser()

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-gray-900">Blog Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.name || 'User'}</span>
            <form action="/api/auth/logout" method="POST">
              <Button 
                type="submit" 
                variant="destructive"
                size="sm"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}