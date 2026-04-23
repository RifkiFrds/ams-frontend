import * as React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

/**
 * Dashboard Layout
 * Structure: Sidebar (Fixed Left) + Header (Sticky Top) + Main Content (Scrollable)
 */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col ml-72 min-w-0">
        {/* Sticky Header */}
        <Header />

        {/* Dynamic Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Content Wrapper */}
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>

        {/* Optional: Dashboard Footer (Sesuai Desain System) */}
        <footer className="px-8 py-6 border-t border-border bg-card">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>© 2024 BPSDM PERTAHANAN - Asset Management System (AMS)</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-foreground cursor-pointer transition-colors">Documentation</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Technical Support</span>
              <span className="h-4 w-px bg-border" />
              <span className="font-medium text-primary">v1.0.0-beta</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
