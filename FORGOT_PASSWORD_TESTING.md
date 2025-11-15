# Forgot Password Feature - Testing Guide

## 🧪 Manual Testing Steps

### Prerequisites
- Application running: `npm run dev`
- Database migrated with new fields
- Valid user account in database

---

## Test 1: Request Password Reset

### Steps:
1. Navigate to http://localhost:3000/login
2. Click "Forgot password?" link
3. You should be redirected to http://localhost:3000/forgot-password
4. Enter a valid email address from your database
5. Click "Send Reset Link"

### Expected Results:
- ✅ Page should show "Check your email" message
- ✅ Email should be received at the provided address
- ✅ Email should contain reset link
- ✅ Reset link should be in format: http://localhost:3000/reset-password/[token]

### Errors to Handle:
- ❌ "Something went wrong" → Check API logs, database connection
- ❌ Email not received → Check Resend API key, email verification status

---

## Test 2: Reset Password with Valid Token

### Steps:
1. Click the reset link from the email
2. You should be on http://localhost:3000/reset-password/[token]
3. Enter a new password (minimum 6 characters)
4. Confirm the new password (must match)
5. Click "Reset Password"

### Expected Results:
- ✅ Page shows "Password reset successfully!"
- ✅ Redirects to login page after 2 seconds
- ✅ You can login with new password

### Test Validations:
- **Password mismatch:** Should show error "Passwords do not match"
- **Password too short:** Should show error "Password must be at least 6 characters"
- **Empty fields:** Should show error "Please fill in all fields"

---

## Test 3: Invalid Token

### Steps:
1. Try to access http://localhost:3000/reset-password/invalid-token
2. Enter any password
3. Click "Reset Password"

### Expected Results:
- ❌ Should show error "Invalid or expired reset token"
- ❌ Password should NOT be changed
- User should be able to request a new reset link

---

## Test 4: Expired Token

### Steps:
1. Wait more than 1 hour after requesting reset
2. Click the old reset link from email
3. Enter new password
4. Click "Reset Password"

### Expected Results:
- ❌ Should show error "Invalid or expired reset token"
- ✅ User should request a new reset link

---

## Test 5: Email Not Found

### Steps:
1. Go to forgot password page
2. Enter an email NOT in your database
3. Click "Send Reset Link"

### Expected Results:
- ✅ Should show "Check your email" message (security: no email enumeration)
- ✅ NO email sent to that address
- ✅ Database shows no token created for non-existent user

---

## Test 6: Multiple Reset Requests

### Steps:
1. Request password reset with email A
2. Check email A - note the token
3. Request password reset AGAIN with email A
4. Check email A - get new token
5. Try using the OLD token to reset password

### Expected Results:
- ✅ New token should work
- ❌ Old token should fail with "Invalid or expired reset token"
- ✅ Only latest token should be valid

---

## Test 7: Login After Password Reset

### Steps:
1. Request password reset
2. Click reset link
3. Set new password to "NewPassword123"
4. Go back to login
5. Try old password

### Expected Results:
- ❌ Old password should NOT work
- ✅ New password SHOULD work
- ✅ Successfully redirect to dashboard

---

## Test 8: UI/UX Testing

### Mobile Responsiveness:
- [ ] Forgot password page responsive on mobile (< 640px)
- [ ] Reset password page responsive on mobile
- [ ] Buttons clickable on mobile
- [ ] Password show/hide toggle works on mobile
- [ ] Email is readable on mobile

### Accessibility:
- [ ] All form labels associated with inputs
- [ ] Color contrast meets WCAG standards
- [ ] Password fields properly marked as password type
- [ ] Error messages clearly visible

### User Experience:
- [ ] Loading state shows while sending email
- [ ] Success message is clear
- [ ] Error messages are helpful
- [ ] Navigation links work (back to login, etc.)

---

## API Testing

### Test Forgot Password Endpoint

```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

**Expected Response (Success):**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

**Expected Response (User not found):**
```json
{
  "success": true,
  "message": "If an account exists with this email, you will receive a password reset link shortly."
}
```

---

### Test Reset Password Endpoint

```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"your-reset-token","newPassword":"NewPassword123"}'
```

**Expected Response (Success):**
```json
{
  "success": true,
  "message": "Password reset successfully. You can now login with your new password."
}
```

**Expected Response (Invalid token):**
```json
{
  "error": "Invalid or expired reset token"
}
```

---

## Database Verification

### Check if reset token was created:
```sql
SELECT id, email, passwordResetToken, passwordResetExpires 
FROM users 
WHERE email = 'user@example.com';
```

### Check token is cleared after reset:
```sql
SELECT id, email, passwordResetToken, passwordResetExpires 
FROM users 
WHERE email = 'user@example.com';
-- Should show NULL values for passwordResetToken and passwordResetExpires
```

---

## Test Checklist

### Core Functionality
- [ ] Forgot password page loads
- [ ] Can request password reset
- [ ] Email received with reset link
- [ ] Reset link opens reset page
- [ ] Can set new password
- [ ] Password is changed in database
- [ ] Can login with new password
- [ ] Old password no longer works

### Error Handling
- [ ] Non-existent email handled gracefully
- [ ] Expired token shows error
- [ ] Invalid token shows error
- [ ] Mismatched passwords show error
- [ ] Empty fields show error
- [ ] Too short password shows error

### Security
- [ ] Token is hashed in database
- [ ] Token expires after 1 hour
- [ ] Only latest token is valid
- [ ] Previous tokens become invalid
- [ ] Email doesn't leak user existence
- [ ] Reset link is cryptographically secure

### UI/UX
- [ ] Forms are responsive
- [ ] Loading states show
- [ ] Success messages are clear
- [ ] Error messages are helpful
- [ ] Navigation works properly
- [ ] Icons render correctly
- [ ] Forms are accessible

---

## Performance Testing

### Response Time
- [ ] Forgot password request completes in < 2 seconds
- [ ] Reset password request completes in < 2 seconds
- [ ] Email delivery within 5 seconds

### Load Testing
- [ ] Can handle multiple simultaneous reset requests
- [ ] Database queries are optimized
- [ ] No memory leaks during extended usage

---

## Troubleshooting Test Failures

### Email Not Received
1. Check Resend dashboard → Email logs
2. Verify RESEND_API_KEY is correct
3. Verify RESEND_FROM_EMAIL is verified
4. Check spam folder
5. Look for rate limiting issues

### Invalid Token Error (When Should be Valid)
1. Check token hasn't expired (> 1 hour)
2. Verify token matches exactly (case-sensitive)
3. Check database for token hash
4. Verify expiration time in database

### Password Not Updating
1. Check password meets validation (6+ chars)
2. Verify API endpoint response
3. Check database for UPDATE query
4. Check user ID is correctly retrieved
5. Look for database transaction errors

### Redirect Issues
1. Check NEXTAUTH_URL is correct
2. Verify redirect URLs in code match routes
3. Check for routing conflicts
4. Verify all route files are created

---

## Documentation

For implementation details, see: `FORGOT_PASSWORD_SETUP.md`
For file structure, see: `FORGOT_PASSWORD_SETUP.md` → File Locations Summary

---

**Last Updated:** 2024
**Feature Status:** ✅ Complete and Ready for Testing