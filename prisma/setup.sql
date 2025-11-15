-- ============================================
-- REVEEL DATABASE SETUP SQL - SUPABASE COMPATIBLE
-- ============================================
-- Purpose: Create all database tables for Reveel
-- Optimized for: Supabase PostgreSQL
-- How to use: Copy and paste this entire file into Supabase SQL Editor
-- ============================================
-- 
-- INSTRUCTIONS FOR SUPABASE:
-- 1. Go to your Supabase project dashboard
-- 2. Click "SQL Editor" in the left sidebar
-- 3. Click "New query"
-- 4. Paste this entire SQL file
-- 5. Click "Run" (or press Cmd/Ctrl + Enter)
-- 6. Verify tables were created in "Table Editor"
-- ============================================

-- Supabase already has JSONB support enabled by default
-- No extensions need to be enabled for this schema

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

-- ============================================
-- COMPETITORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "competitors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "url" TEXT NOT NULL,
    "platform" TEXT NOT NULL DEFAULT 'website',
    "targetSelector" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "scrapeInterval" INTEGER NOT NULL DEFAULT 24,
    "lastScrapedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "competitors_pkey" PRIMARY KEY ("id")
);

-- Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS "competitors_slug_key" ON "competitors"("slug");

-- Create foreign key to users (with error handling for Supabase)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'competitors_userId_fkey'
    ) THEN
        ALTER TABLE "competitors" 
        ADD CONSTRAINT "competitors_userId_fkey" 
        FOREIGN KEY ("userId") REFERENCES "users"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ============================================
-- SNAPSHOTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "snapshots" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "html" TEXT,
    "screenshot" TEXT,
    "extractedData" JSONB,
    "detectedPrice" DOUBLE PRECISION,
    "detectedText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "snapshots_pkey" PRIMARY KEY ("id")
);

-- Create foreign key to competitors (with error handling for Supabase)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'snapshots_competitorId_fkey'
    ) THEN
        ALTER TABLE "snapshots" 
        ADD CONSTRAINT "snapshots_competitorId_fkey" 
        FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ============================================
-- CHANGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "changes" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "changeType" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "isNotified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "changes_pkey" PRIMARY KEY ("id")
);

-- Create foreign keys (with error handling for Supabase)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'changes_competitorId_fkey'
    ) THEN
        ALTER TABLE "changes" 
        ADD CONSTRAINT "changes_competitorId_fkey" 
        FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'changes_snapshotId_fkey'
    ) THEN
        ALTER TABLE "changes" 
        ADD CONSTRAINT "changes_snapshotId_fkey" 
        FOREIGN KEY ("snapshotId") REFERENCES "snapshots"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ============================================
-- REPORTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "reports" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "insights" JSONB NOT NULL,
    "competitors" TEXT[] NOT NULL,
    "period" TEXT NOT NULL DEFAULT 'weekly',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- Create foreign key to users (with error handling for Supabase)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'reports_userId_fkey'
    ) THEN
        ALTER TABLE "reports" 
        ADD CONSTRAINT "reports_userId_fkey" 
        FOREIGN KEY ("userId") REFERENCES "users"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- Create foreign key to users (with error handling for Supabase)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'notifications_userId_fkey'
    ) THEN
        ALTER TABLE "notifications" 
        ADD CONSTRAINT "notifications_userId_fkey" 
        FOREIGN KEY ("userId") REFERENCES "users"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- ============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================

-- Index on competitors userId for faster user queries
CREATE INDEX IF NOT EXISTS "competitors_userId_idx" ON "competitors"("userId");

-- Index on competitors isActive for filtering active competitors
CREATE INDEX IF NOT EXISTS "competitors_isActive_idx" ON "competitors"("isActive");

-- Index on snapshots competitorId for faster lookups
CREATE INDEX IF NOT EXISTS "snapshots_competitorId_idx" ON "snapshots"("competitorId");

-- Index on snapshots createdAt for time-based queries
CREATE INDEX IF NOT EXISTS "snapshots_createdAt_idx" ON "snapshots"("createdAt");

-- Index on changes competitorId for faster lookups
CREATE INDEX IF NOT EXISTS "changes_competitorId_idx" ON "changes"("competitorId");

-- Index on changes snapshotId for faster lookups
CREATE INDEX IF NOT EXISTS "changes_snapshotId_idx" ON "changes"("snapshotId");

-- Index on changes createdAt for time-based queries
CREATE INDEX IF NOT EXISTS "changes_createdAt_idx" ON "changes"("createdAt");

-- Index on reports userId for faster user queries
CREATE INDEX IF NOT EXISTS "reports_userId_idx" ON "reports"("userId");

-- Index on notifications userId for faster user queries
CREATE INDEX IF NOT EXISTS "notifications_userId_idx" ON "notifications"("userId");

-- Index on notifications isRead for filtering unread notifications
CREATE INDEX IF NOT EXISTS "notifications_isRead_idx" ON "notifications"("isRead");

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- All tables, foreign keys, and indexes have been created
-- You can now use the application with this database
-- ============================================
--
-- VERIFICATION:
-- After running this script, verify in Supabase:
-- 1. Go to "Table Editor" in Supabase dashboard
-- 2. You should see these tables:
--    - users
--    - competitors
--    - snapshots
--    - changes
--    - reports
--    - notifications
--
-- NEXT STEPS:
-- 1. Update your .env.local with DATABASE_URL from Supabase
-- 2. Run: npm run db:generate
-- 3. Run: npm run db:push (to sync Prisma with database)
-- 4. Start your app: npm run dev
--
-- NOTE: Supabase Row Level Security (RLS) is NOT enabled by default
-- If you need RLS, you'll need to add policies separately
-- ============================================

