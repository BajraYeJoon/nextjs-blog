'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/actions/auth-actions'
import { useToast } from '@/hooks/useToast'

export function LogoutButton() {
  const router = useRouter();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const res = await logoutAction();
      toast.success(res.message);
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Logout failed.')
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
