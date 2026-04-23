'use client'

import * as React from 'react'
import Link from 'next/link'
import { Search, Bell, Settings, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/modules/auth/store/auth.store'
import { AppButton } from '@/components/primitives'

/**
 * Header Component
 * Design System: bg-card, sticky, rounded-full search
 */

import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 right-0 h-20 bg-card border-b border-border flex items-center justify-between px-8 z-40">
      {/* Left Area: Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Cari aset, user, atau transaksi..."
            className={cn(
              "w-full bg-input border-border text-sm text-foreground rounded-full pl-11 pr-4 py-2.5",
              "focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all",
              "placeholder:text-muted-foreground/60"
            )}
          />
        </div>
      </div>

      {/* Right Area: Actions & User Profile */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <AppButton variant="ghost" size="icon_sm" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive border-2 border-card rounded-full" />
          </AppButton>
        </div>

        {/* Settings */}
        <Link href="/dashboard/profile">
          <AppButton variant="ghost" size="icon_sm" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </AppButton>
        </Link>

        {/* Divider */}
        <div className="h-8 w-px bg-border mx-2" />

        {/* User Profile Mini */}
        <Link href="/dashboard/profile" className="flex items-center gap-3 pl-2 group cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-foreground leading-none group-hover:text-primary transition-colors">
              {user?.nama_lengkap || 'Admin User'}
            </p>
            <p className="text-[10px] font-medium text-muted-foreground uppercase mt-1">
              {user?.roles?.[0]?.nama_role   || 'ADMIN SISTEM'}
            </p>
          </div>
          <div className="h-9 w-9 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
            <User className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
          </div>
        </Link>
      </div>
    </header>
  )
}
