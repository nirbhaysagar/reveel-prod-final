// ============================================
// RATE LIMITING
// ============================================
// Purpose: Prevent abuse and DoS attacks
// Why: Protect expensive operations
// Framework: In-memory rate limiting (Redis-backed async variant for production)
import Redis from 'ioredis'

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

// ============================================
// REDIS-BACKED RATE LIMIT (ASYNC)
// ============================================
// What: Production-ready rate limit using Redis INCR + EX
// Why: Works across multiple instances and persists across restarts

// Check if we're in build mode
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.env.npm_lifecycle_event === 'build'

let redisClient: Redis | null = null
function getRedis(): Redis | null {
  // Don't create Redis connection during build
  if (isBuildTime) {
    return null
  }
  
  if (redisClient) return redisClient
  const url = process.env.REDIS_URL
  if (!url) return null
  
  redisClient = new Redis(url, { 
    maxRetriesPerRequest: null,
    lazyConnect: true, // Don't connect immediately
    enableOfflineQueue: false, // Don't queue commands if not connected
  })
  
  // Suppress connection errors during build
  redisClient.on('error', (err) => {
    if (!isBuildTime) {
      console.error('Redis connection error:', err)
    }
  })
  
  return redisClient
}

export async function checkRateLimitAsync(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): Promise<{ success: boolean; limit: number; remaining: number; reset: number } > {
  const redis = getRedis()

  // Fallback to in-memory if Redis not configured
  if (!redis) {
    return checkRateLimit(identifier, maxRequests, windowMs)
  }

  const key = `rl:${identifier}`
  const ttlSeconds = Math.ceil(windowMs / 1000)

  // Atomically increment counter and set expiry on first increment
  const count = await redis.multi()
    .incr(key)
    .ttl(key)
    .exec()
    .then(results => {
      const incrVal = Number(results?.[0]?.[1] ?? 0)
      const ttlVal = Number(results?.[1]?.[1] ?? -1)
      // If key is new (no TTL), set expiry
      if (ttlVal === -1) {
        // Fire-and-forget setting TTL; not critical to await
        redis.expire(key, ttlSeconds).catch(() => {})
      }
      return incrVal
    })

  if (count > maxRequests) {
    const ttl = await redis.ttl(key)
    const reset = Date.now() + Math.max(ttl, 0) * 1000
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset,
    }
  }

  const ttl = await redis.ttl(key)
  const reset = Date.now() + Math.max(ttl, 0) * 1000
  return {
    success: true,
    limit: maxRequests,
    remaining: Math.max(maxRequests - count, 0),
    reset,
  }
}


