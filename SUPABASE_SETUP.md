# 🗄️ Supabase Database Setup Guide

## ✅ **Quick Setup (5 minutes)**

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: `reveel` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

---

### Step 2: Get Database Connection String
1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll to **"Connection string"** section
3. Select **"URI"** tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the password you set during project creation

---

### Step 3: Run Database Setup SQL
1. In Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"** button
3. Open the file `prisma/setup.sql` from this project
4. Copy the **entire contents** of `prisma/setup.sql`
5. Paste into the SQL Editor
6. Click **"Run"** (or press `Cmd/Ctrl + Enter`)
7. You should see: **"Success. No rows returned"**

---

### Step 4: Verify Tables Were Created
1. In Supabase dashboard, click **"Table Editor"** in the left sidebar
2. You should see these 6 tables:
   - ✅ `users`
   - ✅ `competitors`
   - ✅ `snapshots`
   - ✅ `changes`
   - ✅ `reports`
   - ✅ `notifications`

If you see all 6 tables, your database is ready! 🎉

---

### Step 5: Update Your .env.local
Add your Supabase connection string to `.env.local`:

```bash
# Database (from Supabase Settings → Database)
# Get the "URI" connection string and replace [YOUR-PASSWORD] with your actual password
DATABASE_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres"

# DIRECT_URL can be the SAME as DATABASE_URL for this project
# (This project's Prisma schema only uses DATABASE_URL, so DIRECT_URL is optional)
DIRECT_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres"

# NextAuth (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional services
OPENAI_API_KEY=""
REDIS_URL=""
RESEND_API_KEY=""
NODE_ENV="development"
```

---

### Step 6: Sync Prisma with Database
Run these commands in your terminal:

```bash
cd /Users/ajaykumar/Desktop/reveel-prod-final-master

# Generate Prisma client
npm run db:generate

# Sync Prisma schema with database (optional, but recommended)
npm run db:push
```

---

## 🔍 **Troubleshooting**

### Issue: "relation already exists" error
**Solution:** The tables already exist. This is fine - the SQL uses `IF NOT EXISTS` so it's safe to run multiple times.

### Issue: Foreign key constraint errors
**Solution:** The SQL now includes error handling. If you see errors, try running the SQL again - it will skip existing constraints.

### Issue: Can't connect to database
**Solution:** 
- Double-check your `DATABASE_URL` in `.env.local`
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Verify the connection string format matches exactly

### Issue: Tables not showing in Table Editor
**Solution:**
- Refresh the Supabase dashboard
- Check if you're in the correct project
- Verify the SQL ran successfully (check SQL Editor history)

---

## 📊 **Supabase Features You Can Use**

### 1. **Table Editor**
- View and edit data directly in Supabase dashboard
- Useful for testing and debugging

### 2. **SQL Editor**
- Run custom queries
- View query history
- Save frequently used queries

### 3. **Database Settings**
- Connection pooling (already configured)
- Connection string management
- Database backups (automatic on paid plans)

### 4. **API (Optional)**
- Supabase provides REST and GraphQL APIs
- Not needed for this app (we use Prisma)

---

## 🔒 **Security Notes**

### Row Level Security (RLS)
- **Current setup:** RLS is **NOT enabled** by default
- **Why:** The app uses NextAuth.js for authentication, which handles security at the application level
- **If you need RLS:** You'll need to add policies separately (not covered in this setup)

### Connection Pooling
- Supabase uses **PgBouncer** for connection pooling
- The connection string already includes pooling configuration
- No additional setup needed

---

## ✅ **Verification Checklist**

After setup, verify everything works:

- [ ] Supabase project created
- [ ] Database connection string copied
- [ ] SQL script ran successfully
- [ ] All 6 tables visible in Table Editor
- [ ] `.env.local` updated with `DATABASE_URL`
- [ ] `npm run db:generate` completed
- [ ] `npm run db:push` completed (optional)
- [ ] App starts without database errors (`npm run dev`)

---

## 🚀 **Next Steps**

Once your database is set up:

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Test registration:**
   - Go to `http://localhost:3000/register`
   - Create a test account
   - Check Supabase Table Editor to see the user was created

3. **Test login:**
   - Go to `http://localhost:3000/login`
   - Login with your test account

---

## 💡 **Pro Tips**

1. **Save your database password** - You'll need it for `DATABASE_URL`
2. **Use Supabase Table Editor** - Great for debugging and viewing data
3. **Check SQL Editor history** - See all queries that were run
4. **Free tier limits:**
   - 500 MB database storage
   - 2 GB bandwidth
   - Perfect for development and small projects

---

**Your database is now ready for Reveel! 🎉**

