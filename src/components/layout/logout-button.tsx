'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/actions/auth-actions'
import { useToast } from '@/hooks/useToast'

export function LogoutButton() {
  const router = useRouter()
  const toast = useToast()

  const handleLogout = async () => {
    try {
      const result = await logoutAction()
      
      if (result.success) {
        toast.success(result.message)
        router.push('/')
      } else {
        toast.error(result.error || 'Logout failed')
      }
    } catch (error) {
      toast.error('Logout failed. Please try again.')
    }
  }

  return (
    <Button 
      onClick={handleLogout}
      variant="destructive"
      size="sm"
    >
      Sign Out
    </Button>
  )
}
