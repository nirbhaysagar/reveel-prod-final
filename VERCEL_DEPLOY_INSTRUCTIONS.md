# 🚀 Quick Vercel Deployment Guide

## **Step 1: Deploy via Vercel Dashboard**

1. **Go to [vercel.com](https://vercel.com)** and sign in (or create account)

2. **Click "New Project"**

3. **Import GitHub Repository:**
   - Select `reveel-prod-final` from your GitHub repositories
   - Or paste: `https://github.com/nirbhaysagar/reveel-prod-final`

4. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Add Environment Variables** (IMPORTANT!)
   
   Click "Environment Variables" and add ALL of these:

   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```
   ⚠️ **Replace:** With your actual Supabase database URL

   ```
   DIRECT_URL=postgresql://user:password@host:5432/database?pgbouncer=true&connection_limit=1
   ```
   ⚠️ **Replace:** With your actual Supabase direct connection URL

   ```
   NEXTAUTH_SECRET=your-secret-key-here
   ```
   ⚠️ **Replace:** Generate with `openssl rand -base64 32`

   ```
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```
   ⚠️ **Important:** You'll need to update this AFTER first deployment with your actual Vercel URL

   ```
   REDIS_URL=redis://default:password@host:6379
   ```
   ⚠️ **Replace:** With your actual Redis/Upstash URL

   ```
   OPENAI_API_KEY=sk-YOUR_OPENAI_API_KEY_HERE
   ```
   ⚠️ **Note:** Replace with real key OR use Hugging Face (see below)

   ```
   OPENAI_BASE_URL=
   ```

   ```
   AI_PROVIDER=openai
   ```
   (or `hf` if using Hugging Face)

   ```
   HF_API_KEY=hf_YOUR_HUGGINGFACE_API_KEY_HERE
   ```
   ⚠️ **Replace:** With your actual Hugging Face API key (optional, only if using HF)

   ```
   HF_MODEL=google/gemma-2-2b-it
   ```

   ```
   RESEND_API_KEY=re_YOUR_RESEND_API_KEY_HERE
   ```
   ⚠️ **Replace:** With your actual Resend API key

   ```
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```
   ⚠️ **Update:** Replace with your verified Resend email

   ```
   NODE_ENV=production
   ```

   ```
   ALLOWED_ORIGINS=
   ```

   ```
   APP_URL=https://your-app-name.vercel.app
   ```
   ⚠️ **Update:** After deployment with actual URL

   **For each variable:**
   - ✅ Check: Production
   - ✅ Check: Preview  
   - ✅ Check: Development

6. **Click "Deploy"**

7. **Wait for build to complete** (2-5 minutes)

8. **After deployment:**
   - Copy your deployment URL (e.g., `https://reveel-prod-final.vercel.app`)
   - Go to Settings → Environment Variables
   - Update `NEXTAUTH_URL` and `APP_URL` with your actual URL
   - Trigger a new deployment

---

## **Step 2: Deploy via CLI (Alternative)**

If you prefer CLI:

```bash
# Login to Vercel
npx vercel login

# Deploy (follow prompts)
npx vercel

# For production deployment
npx vercel --prod
```

**But you'll still need to add environment variables via the dashboard!**

---

## **Step 3: Verify Deployment**

After deployment:

1. Visit your Vercel URL
2. Test registration: Create an account
3. Test login: Log in
4. Check dashboard loads

---

## **Important Notes:**

1. **Environment Variables:** You MUST add all environment variables in Vercel dashboard - `.env.local` is NOT used in production!

2. **NEXTAUTH_URL:** Must match your exact Vercel domain (including https://)

3. **Redis URL:** Add your Redis/Upstash URL in Vercel environment variables

4. **OpenAI Key:** Either:
   - Get a real OpenAI key and replace the placeholder, OR
   - Switch `AI_PROVIDER=hf` to use Hugging Face (if configured)

5. **Email:** Update `RESEND_FROM_EMAIL` with your verified domain email in Resend

---

## **After First Deployment:**

1. Update `NEXTAUTH_URL` with your actual Vercel URL
2. Update `APP_URL` with your actual Vercel URL  
3. Trigger a new deployment
4. Test all features

---

## **Need Help?**

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Check build logs if deployment fails

