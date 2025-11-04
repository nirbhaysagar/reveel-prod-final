# 🔧 Environment Variables Setup Guide

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Fill in your values** (see guide below)

3. **Test your setup:**
   ```bash
   npm run dev
   ```

---

## 📋 Where to Get Each Value

### 1. **DATABASE_URL** (Required)

#### Option A: Supabase (Recommended - Free Tier Available)

1. Go to [supabase.com](https://supabase.com)
2. Create account and new project
3. Go to **Settings** → **Database**
4. Find **Connection string** section
5. Copy the **URI** format
6. Replace `[YOUR-PASSWORD]` with your database password

**Example:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

#### Option B: Local PostgreSQL

If running PostgreSQL locally:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/reveel"
```

---

### 2. **NEXTAUTH_SECRET** (Required)

Generate a random secret key (minimum 32 characters):

**Using OpenSSL:**
```bash
openssl rand -base64 32
```

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Online Generator:**
- Visit: https://generate-secret.vercel.app/32

**Example output:**
```
aB3dE5fG6hI8jK9lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2
```

---

### 3. **NEXTAUTH_URL** (Required)

- **Development:** `http://localhost:3000`
- **Production:** `https://your-domain.com`

---

### 4. **OPENAI_API_KEY** (Required for AI Features)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)

**Note:** 
- You'll be charged based on usage
- GPT-4 costs ~$0.03 per 1K tokens (input)
- Monitor your usage at https://platform.openai.com/usage

**Free Trial:** $5 free credit for new accounts

---

### 5. **REDIS_URL** (Required for Background Jobs)

#### Option A: Upstash (Recommended - Free Tier Available)

1. Go to [upstash.com](https://upstash.com)
2. Create account
3. Create new database
4. Choose region closest to you
5. Go to **Details** tab
6. Copy the **REST URL** or **Connection string**

**Example:**
```
redis://default:xxxxxxxxxx@xxx-xxx-xxx.upstash.io:6379
```

#### Option B: Redis Cloud

1. Go to [redis.com/try-free](https://redis.com/try-free)
2. Create account
3. Create database
4. Copy connection string

#### Option C: Local Redis

If running Redis locally:
```
REDIS_URL="redis://localhost:6379"
```

**Install Redis locally:**
```bash
# macOS
brew install redis

# Ubuntu/Debian
sudo apt-get install redis-server

# Windows
# Download from: https://github.com/microsoftarchive/redis/releases
```

---

### 6. **RESEND_API_KEY** (Required for Email Notifications)

1. Go to [resend.com](https://resend.com)
2. Create account
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

**Free Tier:** 3,000 emails/month

---

### 7. **RESEND_FROM_EMAIL** (Required for Email Notifications)

1. In Resend dashboard, go to **Domains**
2. Add and verify your domain (or use provided test domain)
3. Use verified email address

**Important:** 
- Update `src/services/email.ts` line 34 and 127
- Replace `notifications@yourdomain.com` with your verified email

**Format options:**
```
noreply@yourdomain.com
Reveel <noreply@yourdomain.com>
```

---

### 8. **DIRECT_URL** (Optional but Recommended)

Use for Prisma migrations. Usually same as DATABASE_URL but add query params:

```
DIRECT_URL="your-DATABASE_URL?pgbouncer=true&connection_limit=1"
```

**Note:** Not needed if using connection pooling or local database.

---

### 9. **ALLOWED_ORIGINS** (Optional - Production Only)

Comma-separated list of allowed origins for CORS:

```
ALLOWED_ORIGINS="https://yourdomain.com,https://app.yourdomain.com"
```

**Development:** Leave empty (allows all)

---

### 10. **NODE_ENV** (Optional)

- `development` - For local development
- `production` - For production deployment

---

## 🧪 Testing Your Configuration

After setting up `.env.local`, test each service:

### Test Database Connection
```bash
npm run db:generate
npm run db:push
```

### Test Application
```bash
npm run dev
```

Visit: http://localhost:3000

### Test Individual Services

1. **Database:** Check if app starts without database errors
2. **OpenAI:** Try generating an AI insight (requires competitor and change)
3. **Redis:** Check if background jobs are scheduled
4. **Resend:** Send a test email notification

---

## ⚠️ Common Issues

### Issue: "Missing required environment variables"
**Solution:** Make sure all required variables are set and file is named `.env.local`

### Issue: Database connection failed
**Solution:** 
- Check DATABASE_URL format
- Verify database password is correct
- Ensure database is accessible (not blocked by firewall)

### Issue: Redis connection failed
**Solution:**
- Check REDIS_URL format
- Verify Redis is running (if local)
- Check network access

### Issue: Email not sending
**Solution:**
- Verify RESEND_API_KEY is correct
- Check if FROM_EMAIL is verified in Resend
- Update FROM_EMAIL in `src/services/email.ts`

### Issue: OpenAI API errors
**Solution:**
- Verify API key is active
- Check billing/usage limits
- Ensure key has proper permissions

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to git
2. **Use strong NEXTAUTH_SECRET** (32+ characters)
3. **Rotate secrets regularly** in production
4. **Use different keys** for development and production
5. **Restrict API key permissions** when possible
6. **Monitor API usage** to detect abuse

---

## 📝 Example .env.local (Development)

```bash
# Database (Supabase)
DATABASE_URL="postgresql://postgres.xxxxx:mypassword@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.xxxxx:mypassword@aws-0-us-west-1.pooler.supabase.com:6543/postgres"

# NextAuth
NEXTAUTH_SECRET="aB3dE5fG6hI8jK9lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Redis (Upstash)
REDIS_URL="redis://default:xxxxxxxxxx@xxx-xxx-xxx.upstash.io:6379"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# Environment
NODE_ENV="development"
```

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] All environment variables set in hosting platform (Vercel, etc.)
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] NEXTAUTH_URL points to production domain (https://)
- [ ] Database connection uses production database
- [ ] Redis uses production instance
- [ ] Email domain is verified in Resend
- [ ] FROM_EMAIL updated in code (`src/services/email.ts`)
- [ ] ALLOWED_ORIGINS set for production domain
- [ ] NODE_ENV="production"
- [ ] All API keys are production keys (not test keys)

---

## 💡 Need Help?

- Check service dashboards for connection details
- Review error messages in console
- Test each service individually
- Verify account status (not suspended/expired)
- Check service status pages

---

*Last Updated: Based on codebase analysis*


