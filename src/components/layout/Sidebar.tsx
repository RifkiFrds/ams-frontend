'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Box, 
  Tags, 
  MapPin, 
  ShoppingCart, 
  ClipboardList, 
  Repeat, 
  ArrowLeftRight, 
  Wrench, 
  Trash2, 
  Users, 
  FileBarChart,
  LogOut,
} from 'lucide-react'
import { useAuthStore } from '@/modules/auth/store/auth.store'

const NAV_GROUPS = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'MASTER DATA',
    items: [
      { label: 'All Assets', href: '/dashboard/assets', icon: Box },
      { label: 'Categories', href: '/dashboard/categories', icon: Tags },
      { label: 'Locations', href: '/dashboard/locations', icon: MapPin },
    ],
  },
  {
    label: 'PROCUREMENT',
    items: [
      { label: 'Purchase Requests', href: '/dashboard/requests', icon: ShoppingCart },
      { label: 'Purchase Orders', href: '/dashboard/orders', icon: ClipboardList },
    ],
  },
  {
    label: 'TRANSACTIONS',
    items: [
      { label: 'Check-in/Out', href: '/dashboard/transactions', icon: Repeat },
      { label: 'Transfers', href: '/dashboard/transfers', icon: ArrowLeftRight },
    ],
  },
  {
    label: 'MAINTENANCE & DISPOSAL',
    items: [
      { label: 'Maintenance', href: '/dashboard/maintenance', icon: Wrench },
      { label: 'Disposal', href: '/dashboard/disposal', icon: Trash2 },
    ],
  },
  {
    label: 'SYSTEM & REPORTS',
    items: [
      { label: 'User Management', href: '/dashboard/users', icon: Users },
      { label: 'Reports', href: '/dashboard/reports', icon: FileBarChart },
    ],
  },
]

import { useAppLogout } from '@/modules/auth/hooks/useAppLogout'
import { Loader2 } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const { handleLogout, isLoggingOut } = useAppLogout()
  
  // State untuk Open/Close Sidebar
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      {/* Sidebar Container */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen flex flex-col z-40 transition-all duration-300 ease-in-out",
          "bg-card text-card-foreground border-none", 
          // Shadow halus untuk memisahkan sidebar dari konten di Light Mode (hilang di Dark Mode)
          "shadow-xl shadow-black/5 dark:shadow-none",
          // Logika buka tutup
          isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full overflow-hidden"
        )}
      >
        {/* ... (rest of brand/user area) ... */}
        <div className="w-72 flex flex-col h-full">
          {/* ... */}
          {/* Brand Area */}
          <div className="p-6 relative">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div>
                <h1 className="text-sm font-bold text-foreground leading-tight">
                  BPSDM PERTAHANAN
                </h1>
                <p className="text-[10px] font-medium text-muted-foreground tracking-widest">
                  ASET MANAGEMENT
                </p>
              </div>
            </div>
          </div>

          {/* User Card Area */}
          <div className="px-4 mb-6">
            <div className="p-3 rounded-xl border border-border bg-transparent flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                <span className="text-xs font-bold text-muted-foreground">
                  {user?.nama_lengkap?.substring(0, 2).toUpperCase() || 'AD'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {user?.nama_lengkap || 'Admin Sistem'}
                </p>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {user?.roles?.[0]?.nama_role || 'ADMIN SISTEM'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigasi Grouping dengan Scrollbar Halus */}
          <nav className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-smooth">
            <div className="space-y-6">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="space-y-2">
                  <h3 className="px-3 text-[10px] font-bold text-muted-foreground tracking-[0.1em]">
                    {group.label}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 group',
                            isActive 
                              ? 'bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20' 
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted rounded-full'
                          )}
                        >
                          <Icon className={cn(
                            'h-4 w-4',
                            isActive ? 'text-primary-foreground' : 'group-hover:text-foreground'
                          )} />
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Footer / Logout */}
          <div className="p-4 border-t border-border">
            <button
              onClick={() => handleLogout()}
              disabled={isLoggingOut}
              className={cn(
                "flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-destructive transition-colors rounded-full hover:bg-destructive/10",
                isLoggingOut && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              {isLoggingOut ? 'Logging out...' : 'Logout System'}
            </button>
          </div>


        </div>
      </aside>
    </>
  )
}