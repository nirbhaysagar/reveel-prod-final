// ============================================
// RATE LIMITING
// ============================================
// Purpose: Prevent abuse and DoS attacks
// Why: Protect expensive operations
// Framework: In-memory rate limiting (Redis would be better for production)

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries every minute
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 60000)

// ============================================
// RATE LIMIT CHECK
// ============================================
// What: Check if request exceeds rate limit
// Why: Prevent abuse
// Returns: { success: boolean, limit: number, remaining: number, reset: number }

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  if (!entry || entry.resetTime < now) {
    // Create new entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: now + windowMs,
    }
  }

  // Check if limit exceeded
  if (entry.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: entry.resetTime,
    }
  }

  // Increment count
  entry.count++
  
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - entry.count,
    reset: entry.resetTime,
  }
}

// ============================================
// RATE LIMIT CONFIGS
// ============================================

export const RATE_LIMITS = {
  // General API requests
  api: {
    maxRequests: 100,
    windowMs: 60000, // 100 requests per minute
  },
  
  // Expensive operations
  scraping: {
    maxRequests: 5,
    windowMs: 60000, // 5 scrapes per minute
  },
  
  // AI operations
  aiInsights: {
    maxRequests: 10,
    windowMs: 60000, // 10 AI requests per minute
  },
  
  // Authentication
  auth: {
    maxRequests: 5,
    windowMs: 300000, // 5 attempts per 5 minutes
  },
}


