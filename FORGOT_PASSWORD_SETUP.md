# Forgot Password Feature - Setup Guide

## ✅ What Has Been Implemented

I've created a complete forgot password feature with the following components:

### 1. **Database Schema Updates** (`prisma/schema.prisma`)
- Added `passwordResetToken` field to User model
- Added `passwordResetExpires` field to User model

### 2. **API Endpoints**

#### Forgot Password Request
- **Endpoint:** `POST /api/auth/forgot-password`
- **Location:** `src/app/api/auth/forgot-password/route.ts`
- **What it does:**
  - Accepts user's email
  - Generates a secure reset token
  - Stores hashed token and expiration time in database
  - Sends reset email with link

#### Reset Password
- **Endpoint:** `POST /api/auth/reset-password`
- **Location:** `src/app/api/auth/reset-password/route.ts`
- **What it does:**
  - Accepts reset token and new password
  - Validates token hasn't expired
  - Updates user password
  - Clears reset token from database

### 3. **Frontend Pages**

#### Forgot Password Page
- **Location:** `src/app/(auth)/forgot-password/page.tsx`
- **Features:**
  - Email input form
  - Success confirmation message
  - Error handling
  - Link back to login

#### Reset Password Page
- **Location:** `src/app/(auth)/reset-password/[token]/page.tsx`
- **Features:**
  - Password input with show/hide toggle
  - Confirm password field
  - Password validation
  - Success message with redirect to login
  - Error handling for expired tokens

### 4. **Email Service**
- **Location:** `src/services/email.ts`
- Added `sendPasswordResetEmail()` function
- Beautiful HTML email template
- Reset link with 1-hour expiration warning

### 5. **Login Page Update**
- **Location:** `src/app/(auth)/login/page.tsx`
- Updated "Forgot password?" link to point to `/forgot-password`

---

## 🚀 Setup Steps

### Step 1: Apply Database Migration

You need to add the password reset fields to your database. Choose one of the methods below:

#### Method A: Using Prisma (Recommended)
```bash
npm run db:push
```

If the above fails due to connection issues, try:
```bash
npm run db:migrate
```

#### Method B: Manual SQL Migration
If Prisma commands fail, run this SQL directly in your Supabase/PostgreSQL console:

```sql
ALTER TABLE "users" ADD COLUMN "passwordResetToken" TEXT;
ALTER TABLE "users" ADD COLUMN "passwordResetExpires" TIMESTAMP(3);
CREATE INDEX "users_passwordResetToken_idx" ON "users"("passwordResetToken");
```

A SQL file is also available at: `prisma/migrations/add_password_reset_fields.sql`

### Step 2: Verify Environment Variables

Make sure these variables are set in your `.env.local`:

```env
# Email configuration
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Application URL (used in reset email links)
NEXTAUTH_URL=http://localhost:3000
```

### Step 3: Test the Feature

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to login page:**
   - Go to http://localhost:3000/login

3. **Click "Forgot password?"**
   - Should redirect to http://localhost:3000/forgot-password

4. **Enter your email:**
   - You should see a success message
   - Email should be sent (check your Resend logs/email inbox)

5. **Click the reset link in email:**
   - Should redirect to password reset page
   - URL format: http://localhost:3000/reset-password/[token]

6. **Enter new password:**
   - Confirm password must match
   - Click "Reset Password"
   - Should see success message and redirect to login

7. **Login with new password:**
   - Use your email and new password to login

---

## 🔐 Security Features

✅ **Token Hashing** - Tokens are hashed before storing in database
✅ **Token Expiration** - Tokens expire after 1 hour
✅ **Email Validation** - Email doesn't reveal if account exists (prevents enumeration)
✅ **One-time Use** - Token is cleared after successful password reset
✅ **Secure Link** - Reset links contain random 32-byte tokens
✅ **HTTPS Ready** - Works with both HTTP (dev) and HTTPS (production)

---

## 📧 Email Template

The password reset email includes:
- Clear call-to-action button
- 1-hour expiration warning
- Fallback text link if button doesn't work
- Professional branding
- Security information

---

## 🛠️ Troubleshooting

### Issue: "Can't reach database server"
**Solution:** 
- Check your DATABASE_URL in `.env.local`
- Verify database is running and accessible
- For Supabase: Check if IP whitelist allows your connection

### Issue: "Email not received"
**Solution:**
- Check Resend dashboard for errors
- Verify RESEND_API_KEY is correct
- Verify RESEND_FROM_EMAIL is verified in Resend
- Check email spam folder

### Issue: "Invalid or expired reset token"
**Solution:**
- Token expires after 1 hour
- Only the latest token is valid
- User can request a new reset link

### Issue: Password doesn't update
**Solution:**
- Check password meets requirements (6+ characters)
- Verify passwords match
- Check browser console for API errors

---

## 📝 API Response Examples

### Forgot Password - Success
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

### Forgot Password - User Not Found
```json
{
  "success": true,
  "message": "If an account exists with this email, you will receive a password reset link shortly."
}
```

### Reset Password - Success
```json
{
  "success": true,
  "message": "Password reset successfully. You can now login with your new password."
}
```

### Reset Password - Invalid Token
```json
{
  "error": "Invalid or expired reset token"
}
```

---

## 🚢 Deployment Notes

1. **Database Migration:** Apply migrations BEFORE deploying code
   ```bash
   npm run db:deploy
   ```

2. **Environment Variables:** Make sure these are set in production:
   - `NEXTAUTH_URL` (your production domain)
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `DATABASE_URL`

3. **Email Domain:** Update `RESEND_FROM_EMAIL` to use your domain

4. **Token Expiration:** Currently set to 1 hour - customize in:
   - `src/app/api/auth/forgot-password/route.ts` (line 42)
   - Change `3600000` (milliseconds) to desired value

---

## 📚 File Locations Summary

```
src/
├── app/
│   └── (auth)/
│       ├── login/page.tsx (UPDATED - forgot password link)
│       ├── forgot-password/
│       │   └── page.tsx (NEW)
│       └── reset-password/
│           └── [token]/
│               └── page.tsx (NEW)
└── app/
    └── api/
        └── auth/
            ├── forgot-password/
            │   └── route.ts (NEW)
            └── reset-password/
                └── route.ts (NEW)
└── services/
    └── email.ts (UPDATED - added sendPasswordResetEmail function)

prisma/
├── schema.prisma (UPDATED - added passwordResetToken & passwordResetExpires)
└── migrations/
    └── add_password_reset_fields.sql (NEW)
```

---

## ✨ Next Steps

1. Apply database migration
2. Test the forgot password flow
3. Customize email template if needed (in `src/services/email.ts`)
4. Deploy to production
5. Update your website's login help/FAQ with reset password instructions

---

## 💡 Features You Can Enhance

- [ ] Add rate limiting to prevent brute force attempts
- [ ] Send confirmation email after successful password reset
- [ ] Add option to require email verification after password reset
- [ ] Implement password strength meter
- [ ] Add security questions as additional verification
- [ ] Log password reset attempts for audit trail

---

**Questions?** Check the code comments in each file - they're detailed!