import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { LogoutButton } from '../logout-button'
import { ModeToggle } from '@/components/ui/theme-toggle'

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
    <header className="header sticky top-0 z-50 w-full border-b border-border/40 bg-background">

        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-foreground">Blog Dashboard</h1>
          <div className="actions- flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name || 'User'}</span>
            <ModeToggle />
            <LogoutButton />
          </div>
        </div>
     
    </header>
  )
}