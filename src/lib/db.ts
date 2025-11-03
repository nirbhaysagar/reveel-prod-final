// ============================================
// DATABASE CONNECTION
// ============================================
// Purpose: Manages Prisma Client instance
// Why: Ensures single connection to database
// Framework: Prisma

import { PrismaClient } from '@prisma/client'

// ============================================
// GLOBAL PRISMA INSTANCE
// ============================================
// What: Global variable to store Prisma instance
// Why: Prevents multiple connections in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// ============================================
// PRISMA CLIENT
// ============================================
// What: Single Prisma client instance
// Why: Reuses connection across requests
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// ============================================
// DEVELOPMENT SETUP
// ============================================
// What: Store prisma in global in development
// Why: Prevents connection issues during hot reload
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
