// ============================================
// SESSION PROVIDER COMPONENT
// ============================================
// Purpose: Wrapper for NextAuth SessionProvider
// Why: SessionProvider must be a client component
// Framework: Next.js Client Component

'use client'

import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
