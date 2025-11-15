# 📝 DATABASE_URL vs DIRECT_URL - Explained

## Quick Answer

**For this project, they can be the SAME value.**

---

## What They Are

### `DATABASE_URL` (Required)
- **What it is:** Main database connection string
- **Used by:** Your application (Prisma uses this)
- **Where:** Supabase Settings → Database → Connection string → URI tab
- **Format:** `postgresql://postgres.xxxxx:password@host:6543/postgres`

### `DIRECT_URL` (Optional)
- **What it is:** Direct database connection (bypasses connection pooling)
- **Used by:** Prisma migrations (sometimes)
- **Note:** This project's Prisma schema **doesn't actually use DIRECT_URL**, so it's optional

---

## For Supabase

### Option 1: Same Value (Simplest) ✅
```bash
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.xxxxx:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```
**This works perfectly for this project!**

### Option 2: Different (Advanced)
If you want to use direct connection for migrations:
```bash
# Pooled connection (for app)
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres"

# Direct connection (for migrations) - port 5432 instead of 6543
DIRECT_URL="postgresql://postgres.xxxxx:password@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
```

**Note:** Option 2 is only needed if you have migration issues. For most cases, Option 1 is fine.

---

## Why Two URLs?

Some projects use two URLs because:
- **DATABASE_URL**: Goes through connection pooler (PgBouncer) - faster for many connections
- **DIRECT_URL**: Direct connection - needed for some migration operations

**But for this project:** The Prisma schema only references `DATABASE_URL`, so `DIRECT_URL` is just there for convention. You can set them to the same value.

---

## How to Get Your Supabase URLs

1. Go to Supabase Dashboard → **Settings** → **Database**
2. Scroll to **"Connection string"** section
3. You'll see two options:
   - **URI** (pooled, port 6543) - Use this for both DATABASE_URL and DIRECT_URL
   - **Direct connection** (port 5432) - Only needed if you have migration issues

---

## Summary

✅ **For this project:** Set both to the same value (the URI from Supabase)  
✅ **Simplest setup:** Copy the same connection string to both variables  
✅ **Works perfectly:** The app only uses DATABASE_URL anyway

---

## Example .env.local

```bash
# Get this from Supabase Settings → Database → Connection string → URI
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres"

# Can be the same as DATABASE_URL
DIRECT_URL="postgresql://postgres.abcdefghijklmnop:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**That's it!** 🎉

