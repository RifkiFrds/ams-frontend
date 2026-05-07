'use client'

import React from 'react'
import { PageShell } from '@/components/patterns'
import { AppCard, AppCardContent } from '@/components/primitives'
import { AlertCircle } from 'lucide-react'

export default function PenghapusanPage() {
  return (
    <PageShell 
      title="Penghapusan" 
      description="Proses pemutihan atau pemusnahan aset yang sudah tidak layak."
    >
      <AppCard variant="alert">
        <AppCardContent className="flex items-center gap-3 pt-5">
          <AlertCircle className="h-5 w-5 text-warning" />
          <p className="text-sm font-medium">Module under development</p>
        </AppCardContent>
      </AppCard>
    </PageShell>
  )
}
