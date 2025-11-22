'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/theme-toggle'

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <span className="font-bold text-lg text-foreground">Blog</span>
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
