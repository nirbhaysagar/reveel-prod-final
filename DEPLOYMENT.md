# 🚀 REVEEL - PRODUCTION DEPLOYMENT GUIDE

## Overview
This guide will help you deploy the Reveel competitive intelligence platform to production using Vercel (frontend) and Supabase (database + backend services).

## Prerequisites
- [ ] GitHub account
- [ ] Vercel account (free tier available)
- [ ] Supabase account (free tier available)
- [ ] OpenAI API key
- [ ] Resend account (for emails)
- [ ] Upstash account (for Redis)

## Phase 1: Database Setup (Supabase)

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and enter project details:
   - **Name**: `reveel-production`
   - **Database Password**: Generate strong password
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for project to be ready (2-3 minutes)

### 1.2 Get Database URLs
1. Go to **Settings** → **Database**
2. Copy the following URLs:
   - **Connection string**: `postgresql://postgres:[password]@[host]:5432/postgres`
   - **Direct connection**: `postgresql://postgres:[password]@[host]:5432/postgres?pgbouncer=true&connection_limit=1`

### 1.3 Run Database Migrations
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link project: `supabase link --project-ref [your-project-ref]`
4. Run migrations: `supabase db push`

## Phase 2: Frontend Deployment (Vercel)

### 2.1 Prepare Repository
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./reveel` (if your app is in a subfolder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2.3 Environment Variables
Add these environment variables in Vercel dashboard:

```bash
# Database
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
DIRECT_URL=postgresql://postgres:[password]@[host]:5432/postgres?pgbouncer=true&connection_limit=1

# NextAuth
NEXTAUTH_SECRET=your_production_secret_min_32_chars
NEXTAUTH_URL=https://your-app-name.vercel.app

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Redis (Upstash)
REDIS_URL=your_upstash_redis_url

# Email
RESEND_API_KEY=your_resend_api_key

# Environment
NODE_ENV=production
```

## Phase 3: External Services Setup

### 3.1 Redis (Upstash)
1. Go to [upstash.com](https://upstash.com)
2. Create new database
3. Choose region close to your users
4. Copy the REST URL

### 3.2 Email Service (Resend)
1. Go to [resend.com](https://resend.com)
2. Create account and verify domain
3. Generate API key
4. Add to environment variables

### 3.3 OpenAI API
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key
3. Add to environment variables

## Phase 4: Production Testing

### 4.1 Test Deployment
1. Visit your Vercel URL
2. Test all functionality:
   - [ ] User registration
   - [ ] User login
   - [ ] Competitor management
   - [ ] Change detection
   - [ ] Background jobs
   - [ ] Notifications
   - [ ] Security features

### 4.2 Performance Optimization
1. Enable Vercel Analytics
2. Configure caching headers
3. Optimize images
4. Monitor Core Web Vitals

## Phase 5: Domain & SSL

### 5.1 Custom Domain (Optional)
1. In Vercel dashboard, go to **Domains**
2. Add your custom domain
3. Configure DNS records
4. SSL certificate is automatically provisioned

## Phase 6: Monitoring & Maintenance

### 6.1 Monitoring Setup
1. Enable Vercel Analytics
2. Set up Supabase monitoring
3. Configure error tracking
4. Set up uptime monitoring

### 6.2 Backup Strategy
1. Enable Supabase backups
2. Regular database exports
3. Code repository backups

## Production Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] External services configured
- [ ] Security audit completed

### Post-Deployment
- [ ] Domain accessible
- [ ] SSL certificate active
- [ ] All features working
- [ ] Performance acceptable
- [ ] Monitoring active
- [ ] Backups configured

## Troubleshooting

### Common Issues
1. **Build Failures**: Check environment variables
2. **Database Connection**: Verify DATABASE_URL
3. **Authentication Issues**: Check NEXTAUTH_SECRET
4. **Email Not Working**: Verify RESEND_API_KEY
5. **Redis Errors**: Check REDIS_URL

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## Cost Estimation (Monthly)

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited static sites
- **Supabase**: 500MB database, 50,000 monthly active users
- **Upstash**: 10,000 requests/day
- **Resend**: 3,000 emails/month
- **OpenAI**: Pay per use

### Scaling Costs
- **Vercel Pro**: $20/month (1TB bandwidth)
- **Supabase Pro**: $25/month (8GB database)
- **Upstash**: $0.2 per 100K requests
- **Resend**: $20/month (50K emails)

## Next Steps After Deployment

1. **User Onboarding**: Create user guides
2. **Analytics**: Set up user tracking
3. **Marketing**: Launch marketing campaign
4. **Support**: Set up customer support
5. **Scaling**: Monitor and scale as needed

---

**Ready to deploy? Let's start with Phase 1!** 🚀
