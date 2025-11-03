// ============================================
// NEXT AUTH API ROUTE
// ============================================
// Purpose: Creates authentication endpoints
// Why: NextAuth needs API routes to handle login/logout/session
// Framework: Next.js API Route

import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// ============================================
// HANDLER
// ============================================
// What: Handles all authentication requests
// How: NextAuth creates routes like:
//   - /api/auth/signin
//   - /api/auth/signout
//   - /api/auth/session
//   - /api/auth/callback/credentials
const handler = NextAuth(authOptions)

// ============================================
// EXPORTS
// ============================================
// What: Exports GET and POST handlers
// Why: Next.js API routes need both methods
export const GET = handler
export const POST = handler