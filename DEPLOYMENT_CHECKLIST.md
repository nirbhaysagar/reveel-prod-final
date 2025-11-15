# 🚀 Production Deployment Checklist - Reveel

## ✅ **Completed**
- [x] All TypeScript type errors fixed
- [x] Build passes successfully
- [x] Redis connection errors suppressed during build
- [x] Code pushed to GitHub

---

## 📋 **Phase 1: Environment Variables Setup** (15-20 minutes)

### **1.1 Database Setup (Supabase)**
- [ ] Go to [supabase.com](https://supabase.com) and create account
- [ ] Create new project: "reveel-production"
- [ ] Copy **Connection String** from Settings → Database
  - Format: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
- [ ] Add to `.env.local`:
  ```bash
  DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
  DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
  ```

### **1.2 NextAuth Secret**
- [ ] Generate secret (run in terminal):
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```
- [ ] Add to `.env.local`:
  ```bash
  NEXTAUTH_SECRET="[generated-secret]"
  NEXTAUTH_URL="https://your-app.vercel.app"
  ```

### **1.3 Redis Setup (Upstash)**
- [ ] Go to [upstash.com](https://upstash.com) and create account
- [ ] Create new Redis database
- [ ] Copy **REST URL** (redis://default:[password]@[host]:6379)
- [ ] Add to `.env.local`:
  ```bash
  REDIS_URL="redis://default:[password]@[host]:6379"
  ```

### **1.4 OpenAI API Key**
- [ ] Go to [platform.openai.com](https://platform.openai.com/api-keys)
- [ ] Create new API key
- [ ] Add to `.env.local`:
  ```bash
  OPENAI_API_KEY="sk-..."
  ```

### **1.5 Email Service (Resend)**
- [ ] Go to [resend.com](https://resend.com) and create account
- [ ] Verify your domain (or use test domain)
- [ ] Generate API key
- [ ] Add to `.env.local`:
  ```bash
  RESEND_API_KEY="re_..."
  RESEND_FROM_EMAIL="noreply@yourdomain.com"
  ```

---

## 📋 **Phase 2: Database Setup** (10 minutes)

### **2.1 Run Database Migrations**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### **2.2 Verify Tables Created**
- [ ] Check Supabase dashboard → Table Editor
- [ ] Should see: User, Competitor, Snapshot, Change, Report, Notification

---

## 📋 **Phase 3: Deploy to Vercel** (20 minutes)

### **3.1 Connect GitHub to Vercel**
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "New Project"
- [ ] Import repository: `reveel-prod-final`
- [ ] Framework: Next.js (auto-detected)

### **3.2 Configure Environment Variables in Vercel**
Add ALL these variables in Vercel dashboard → Settings → Environment Variables:

```bash
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_SECRET=[your-secret]
NEXTAUTH_URL=https://your-app.vercel.app
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
NODE_ENV=production
```

- [ ] Add each variable
- [ ] Set environment to: Production, Preview, Development (for all)
- [ ] Save all variables

### **3.3 Deploy**
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Copy deployment URL: `https://your-app.vercel.app`

### **3.4 Update NEXTAUTH_URL**
- [ ] Go back to Vercel → Settings → Environment Variables
- [ ] Update `NEXTAUTH_URL` to your actual Vercel URL
- [ ] Redeploy (trigger new deployment)

---

## 📋 **Phase 4: Worker Deployment** (30 minutes)

The background worker needs to run separately (Vercel doesn't support long-running processes).

### **Option A: Railway (Recommended - Easiest)**
- [ ] Go to [railway.app](https://railway.app)
- [ ] Create account and new project
- [ ] Click "New" → "GitHub Repo" → Select `reveel-prod-final`
- [ ] Click "Add Service" → "Empty Service"
- [ ] In service settings:
  - Build Command: `npm install && npm run db:generate`
  - Start Command: `npm run worker:prod`
- [ ] Add environment variables (same as Vercel)
- [ ] Deploy

### **Option B: Render**
- [ ] Go to [render.com](https://render.com)
- [ ] Create account
- [ ] New → Background Worker
- [ ] Connect GitHub repo
- [ ] Settings:
  - Build Command: `npm install && npm run db:generate`
  - Start Command: `npm run worker:prod`
- [ ] Add environment variables
- [ ] Deploy

### **Option C: Fly.io**
- [ ] Install Fly CLI: `npm i -g @fly/cli`
- [ ] Run: `fly launch`
- [ ] Create `fly.toml` with worker config
- [ ] Deploy: `fly deploy`

---

## 📋 **Phase 5: Testing** (30 minutes)

### **5.1 Test Deployment**
- [ ] Visit your Vercel URL
- [ ] Test registration: Create new account
- [ ] Test login: Log in with account
- [ ] Check dashboard loads

### **5.2 Test Core Features**
- [ ] Add a competitor: `/competitors/new`
- [ ] Test manual scrape: Click "Scrape Now"
- [ ] Check worker logs (Railway/Render dashboard)
- [ ] Verify snapshot created in database

### **5.3 Test AI Features**
- [ ] Wait for change detection (or trigger manually)
- [ ] Test AI insight generation
- [ ] Verify insight appears in dashboard

### **5.4 Test Reports**
- [ ] Generate weekly report
- [ ] Check report appears in `/dashboard/reports`
- [ ] Test download (PDF/CSV/JSON)

### **5.5 Test Notifications**
- [ ] Trigger a change
- [ ] Check notification appears
- [ ] Test mark as read

---

## 📋 **Phase 6: Post-Deployment** (15 minutes)

### **6.1 Initial Job Scheduling**
- [ ] Log in to your production app
- [ ] Open browser console on dashboard
- [ ] Run:
  ```javascript
  fetch('/api/admin/schedule-scraping', { method: 'POST' })
    .then(r => r.json())
    .then(console.log)
  ```
- [ ] This schedules recurring jobs for all competitors

### **6.2 Remove Admin Endpoint** (Security)
- [ ] After scheduling, delete: `src/app/api/admin/schedule-scraping/route.ts`
- [ ] Commit and push to GitHub
- [ ] Vercel will auto-deploy

### **6.3 Monitor**
- [ ] Check Vercel dashboard for build status
- [ ] Check worker logs for job execution
- [ ] Monitor Supabase for database activity
- [ ] Check error logs

---

## 📋 **Phase 7: Custom Domain (Optional)**

### **7.1 Add Domain in Vercel**
- [ ] Go to Vercel → Settings → Domains
- [ ] Add your custom domain
- [ ] Configure DNS records as shown
- [ ] Wait for SSL certificate (automatic)

### **7.2 Update Environment Variables**
- [ ] Update `NEXTAUTH_URL` to your custom domain
- [ ] Redeploy

---

## 🔍 **Troubleshooting**

### **Build Fails**
- Check environment variables are set correctly
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`

### **Database Connection Errors**
- Verify `DATABASE_URL` format is correct
- Check Supabase database is running
- Verify password in connection string

### **Worker Not Running**
- Check worker logs in Railway/Render
- Verify `REDIS_URL` is correct
- Check `DATABASE_URL` is accessible from worker
- Verify worker process is running: `ps aux | grep worker`

### **Auth Not Working**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain exactly
- Check browser console for errors

### **Jobs Not Executing**
- Verify worker is deployed and running
- Check Redis connection
- Run schedule endpoint again
- Check worker logs for errors

---

## ✅ **Final Checklist**

Before considering deployment complete:

- [ ] All environment variables set in Vercel
- [ ] Database migrations applied
- [ ] Vercel deployment successful
- [ ] Worker deployed and running
- [ ] User registration works
- [ ] User login works
- [ ] Competitor CRUD works
- [ ] Scraping works
- [ ] Change detection works
- [ ] AI insights work
- [ ] Reports generation works
- [ ] Notifications work
- [ ] Jobs are scheduled
- [ ] No critical errors in logs

---

## 🎉 **You're Done!**

Once all checkboxes are marked, your Reveel platform is fully deployed and production-ready!

**Next Steps:**
- Monitor for errors
- Set up uptime monitoring
- Configure backups
- Scale as needed
