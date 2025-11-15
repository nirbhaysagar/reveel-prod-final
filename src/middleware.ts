import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(request: NextRequest) {
    const origin = request.headers.get('origin')
    const response = NextResponse.next()

    // CORS headers for API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
      if (process.env.NODE_ENV === 'production') {
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
        if (origin && allowedOrigins.includes(origin)) {
          response.headers.set('Access-Control-Allow-Origin', origin)
        }
      } else if (origin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }

      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.headers.set('Access-Control-Allow-Credentials', 'true')
      response.headers.set('Access-Control-Max-Age', '86400')

      if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204 })
      }
    }

    response.headers.set('X-DNS-Prefetch-Control', 'on')
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

    return response
  },
  {
    callbacks: {
      // Protect dashboard with auth; allow others to pass through
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        return true
      },
    },
    pages: { signIn: '/login' },
  }
)

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
}
