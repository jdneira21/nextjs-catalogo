'use client'
import { queryClient } from '@/libs/query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}