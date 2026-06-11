'use client'

import React, { Suspense } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProviderWrapper } from '@/contexts/ThemeContext'
import AppLayout from '@/components/layout/AppLayout'
import { LucideLoader2 } from 'lucide-react'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center h-screen bg-void text-white">
            <LucideLoader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-widest">
              Initializing Agent Marketplace...
            </span>
          </div>
        }>
          <AppLayout>{children}</AppLayout>
        </Suspense>
      </ThemeProviderWrapper>
    </AuthProvider>
  )
}
