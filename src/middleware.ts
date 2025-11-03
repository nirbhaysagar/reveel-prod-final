import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the origin header
  const origin = request.headers.get('origin')

  // Create response
  const response = NextResponse.next()

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Allow specific origins in production, or all in development
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
      if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }
    } else {
      // Development: Allow all origins
      if (origin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }
    }

    // CORS headers
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Max-Age', '86400')

    // Handle OPTIONS requests (preflight)
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204 })
    }
  }

  // Security headers for all requests
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

  // Request logging (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log(`${request.method} ${request.nextUrl.pathname}`)
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
  ],
}
