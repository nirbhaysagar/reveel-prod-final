# 🧪 TESTING GUIDE - Reveel Platform

## 📋 Overview

This guide provides comprehensive testing instructions for the Reveel competitive intelligence platform.

**Version:** 1.0  
**Last Updated:** October 21, 2025

---

## 🚀 Quick Start

### **1. Environment Setup**

Before testing, ensure all environment variables are set in `.env`:

```env
# Required
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional (for full functionality)
OPENAI_API_KEY="sk-..."
REDIS_URL="redis://..."
RESEND_API_KEY="re_..."
```

### **2. Start the Application**

**Terminal 1 - Next.js Server:**
```powershell
cd reveel
npm run dev
```

**Terminal 2 - Background Worker (Optional):**
```powershell
cd reveel
npm run worker
```

### **3. Access the Application**

Open your browser: `http://localhost:3000`

---

## 📝 TEST CHECKLIST

### **Phase 1: Authentication** ✅

- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Logout
- [ ] Session persistence (refresh page)
- [ ] Protected routes redirect to login

### **Phase 2: Competitor Management** ✅

- [ ] Add new competitor
- [ ] View competitor list
- [ ] Edit competitor details
- [ ] Delete competitor
- [ ] Toggle tracking status
- [ ] View competitor details page

### **Phase 3: Change Detection** ✅

- [ ] Manual scrape competitor
- [ ] View scraping results
- [ ] See detected changes
- [ ] Compare old vs new values
- [ ] View change history

### **Phase 4: AI Integration** ✅

- [ ] Generate AI insight for change
- [ ] Generate weekly report
- [ ] View report summary
- [ ] View key changes
- [ ] View recommendations

### **Phase 5: Background Jobs** ⚙️

- [ ] Schedule scraping jobs
- [ ] View job status
- [ ] Verify automatic scraping
- [ ] Check job error handling

### **Phase 6: Notifications** 📧

- [ ] Receive email on change detection
- [ ] View in-app notifications
- [ ] Mark notifications as read
- [ ] View notification history

### **Phase 7: Security** 🔒

- [ ] Test rate limiting
- [ ] Test input validation
- [ ] Test URL validation
- [ ] Test unauthorized access
- [ ] Test password requirements

---

## 🧪 DETAILED TEST CASES

### **1. AUTHENTICATION TESTS**

#### **Test 1.1: User Registration**

**Steps:**
1. Go to `http://localhost:3000/register`
2. Fill in the form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "test123456"
3. Click "Register"

**Expected Result:**
- ✅ User created successfully
- ✅ Redirected to login page
- ✅ Success message displayed

**Test Invalid Inputs:**
```bash
# Weak password (should fail)
Password: "12345" ❌

# Invalid email (should fail)
Email: "not-an-email" ❌

# Short name (should fail)
Name: "" ❌

# Password without numbers (should fail)
Password: "abcdefgh" ❌
```

---

#### **Test 1.2: User Login**

**Steps:**
1. Go to `http://localhost:3000/login`
2. Enter credentials:
   - Email: "test@example.com"
   - Password: "test123456"
3. Click "Sign In"

**Expected Result:**
- ✅ Login successful
- ✅ Redirected to `/dashboard`
- ✅ Session created

**Test Invalid Login:**
```bash
# Wrong password
Password: "wrongpassword" ❌

# Non-existent user
Email: "fake@example.com" ❌
```

---

### **2. COMPETITOR MANAGEMENT TESTS**

#### **Test 2.1: Add Competitor**

**Steps:**
1. Go to `/dashboard/competitors`
2. Click "Add Competitor"
3. Fill in the form:
   - Name: "Amazon"
   - URL: "https://www.amazon.com"
   - Platform: "Website"
   - Scrape Interval: 24
4. Click "Create Competitor"

**Expected Result:**
- ✅ Competitor created
- ✅ Appears in competitor list
- ✅ Redirected to competitors page

**Test Invalid URLs:**
```bash
# Internal URLs (should fail)
URL: "http://localhost:3000" ❌
URL: "http://192.168.1.1" ❌
URL: "http://127.0.0.1" ❌

# Private networks (should fail)
URL: "http://10.0.0.1" ❌

# Invalid protocols (should fail)
URL: "file:///etc/passwd" ❌
URL: "ftp://example.com" ❌

# Valid URLs (should pass)
URL: "https://www.google.com" ✅
URL: "https://www.nike.com" ✅
```

---

#### **Test 2.2: View Competitor List**

**Steps:**
1. Go to `/dashboard/competitors`
2. Verify competitor appears

**Expected Result:**
- ✅ Competitor card displayed
- ✅ Shows name, URL, platform
- ✅ Shows active/inactive status
- ✅ Has "View Details" and "Edit" buttons

---

#### **Test 2.3: Edit Competitor**

**Steps:**
1. Go to `/dashboard/competitors`
2. Click "Edit" on a competitor
3. Change name to "Amazon USA"
4. Click "Update"

**Expected Result:**
- ✅ Competitor updated
- ✅ New name displayed
- ✅ Redirected back to list

---

#### **Test 2.4: Delete Competitor**

**Steps:**
1. Go to `/dashboard/competitors`
2. Click "Delete" on a competitor
3. Confirm deletion

**Expected Result:**
- ✅ Competitor removed from list
- ✅ Database record deleted
- ✅ Related snapshots/changes deleted (cascade)

---

### **3. CHANGE DETECTION TESTS**

#### **Test 3.1: Manual Scraping**

**Steps:**
1. Go to `/dashboard/competitors`
2. Click on a competitor
3. Click "Scrape Now"
4. Wait for completion

**Expected Result:**
- ✅ Scraping initiated
- ✅ Progress indicator shown
- ✅ Snapshot saved to database
- ✅ Changes detected (if any)
- ✅ Success message displayed

**Check Database:**
```sql
-- Should have new snapshot
SELECT * FROM snapshots ORDER BY "createdAt" DESC LIMIT 1;

-- Should have changes (if detected)
SELECT * FROM changes ORDER BY "createdAt" DESC LIMIT 5;
```

---

#### **Test 3.2: View Changes**

**Steps:**
1. Go to competitor details page
2. Scroll to "Change History"

**Expected Result:**
- ✅ Changes displayed
- ✅ Shows old vs new values
- ✅ Shows confidence score
- ✅ Shows timestamp
- ✅ Color-coded by type

---

#### **Test 3.3: Rate Limiting**

**Steps:**
1. Click "Scrape Now" 6 times rapidly

**Expected Result:**
- ✅ First 5 requests succeed
- ✅ 6th request fails with HTTP 429
- ✅ Error message: "Rate limit exceeded"
- ✅ Shows retry time

---

### **4. AI INTEGRATION TESTS**

#### **Test 4.1: Generate AI Insight**

**Prerequisites:** `OPENAI_API_KEY` set in `.env`

**Steps:**
1. Go to competitor details page
2. Find a detected change
3. Click "Get AI Insight"
4. Wait for response

**Expected Result:**
- ✅ Loading indicator shown
- ✅ AI insight generated
- ✅ Insight displayed in blue box
- ✅ Provides context and recommendations

---

#### **Test 4.2: Generate Weekly Report**

**Prerequisites:** `OPENAI_API_KEY` set in `.env`

**Steps:**
1. Go to `/dashboard/insights`
2. Click "Generate Weekly Report"
3. Wait for processing

**Expected Result:**
- ✅ Loading indicator shown
- ✅ Report generated
- ✅ Shows executive summary
- ✅ Shows key changes
- ✅ Shows recommendations
- ✅ Report saved to database

---

### **5. BACKGROUND JOBS TESTS**

#### **Test 5.1: Schedule Jobs**

**Prerequisites:** `REDIS_URL` set in `.env`

**Steps:**
1. Start worker: `npm run worker`
2. Check worker logs

**Expected Result:**
- ✅ Worker starts successfully
- ✅ Jobs scheduled for all active competitors
- ✅ Logs show "Scheduled X scraping jobs"

---

#### **Test 5.2: Automatic Scraping**

**Steps:**
1. Wait for scheduled scrape (based on interval)
2. Check database for new snapshots

**Expected Result:**
- ✅ Snapshots created automatically
- ✅ Changes detected automatically
- ✅ Competitor `lastScrapedAt` updated

---

#### **Test 5.3: View Job Status**

**Steps:**
1. Make API call: `GET /api/jobs/status`

**Expected Result:**
```json
{
  "jobs": [
    {
      "id": "...",
      "name": "scrape-competitor-123",
      "state": "completed",
      "progress": 100,
      "data": { "competitorId": "..." }
    }
  ]
}
```

---

### **6. NOTIFICATIONS TESTS**

#### **Test 6.1: Email Notifications**

**Prerequisites:** `RESEND_API_KEY` set in `.env`

**Steps:**
1. Trigger a change detection
2. Check email inbox

**Expected Result:**
- ✅ Email received
- ✅ Professional HTML design
- ✅ Shows competitor name
- ✅ Shows old vs new values
- ✅ Has "View in Dashboard" button

---

#### **Test 6.2: In-App Notifications**

**Steps:**
1. Go to dashboard
2. Click notifications icon (bell)

**Expected Result:**
- ✅ Notification dropdown appears
- ✅ Shows recent notifications
- ✅ Unread count badge
- ✅ Click to mark as read

---

### **7. SECURITY TESTS**

#### **Test 7.1: URL Validation**

**Test via API:**
```bash
# Should fail - internal URLs
POST /api/competitors
{
  "name": "Test",
  "url": "http://localhost:3000"
}
Expected: 400 Bad Request ❌

# Should fail - private network
POST /api/competitors
{
  "name": "Test",
  "url": "http://192.168.1.1"
}
Expected: 400 Bad Request ❌

# Should pass - public URL
POST /api/competitors
{
  "name": "Test",
  "url": "https://www.google.com"
}
Expected: 201 Created ✅
```

---

#### **Test 7.2: Rate Limiting**

**Test via API:**
```bash
# Make 6 scrape requests rapidly
for i in {1..6}
do
  curl -X POST http://localhost:3000/api/competitors/{id}/scrape
done

# Expected:
# Requests 1-5: 200 OK ✅
# Request 6: 429 Too Many Requests ❌
# Header: Retry-After: 60
```

---

#### **Test 7.3: Authentication**

**Test unauthorized access:**
```bash
# Without login
GET /dashboard
Expected: Redirect to /login ✅

GET /api/competitors
Expected: 401 Unauthorized ❌
```

---

#### **Test 7.4: Authorization**

**Test accessing other user's data:**
```bash
# User A tries to access User B's competitor
GET /api/competitors/{user-b-competitor-id}
Expected: 403 Forbidden ❌
```

---

#### **Test 7.5: Input Validation**

**Test with dangerous inputs:**
```bash
# XSS attempt
POST /api/competitors
{
  "name": "<script>alert('xss')</script>",
  "url": "https://example.com"
}
Expected: Sanitized, no script execution ✅

# SQL injection attempt
POST /api/competitors
{
  "name": "'; DROP TABLE users; --",
  "url": "https://example.com"
}
Expected: Treated as string, no SQL execution ✅

# Overly long input
POST /api/competitors
{
  "name": "A".repeat(1000),
  "url": "https://example.com"
}
Expected: 400 Bad Request ❌
```

---

## 🐛 KNOWN ISSUES & LIMITATIONS

### **Current Limitations:**

1. **Rate Limiting:**
   - ⚠️ In-memory only (single server)
   - 🔧 Solution: Use Redis for production

2. **Scraping:**
   - ⚠️ Some websites block automated scraping
   - 🔧 Solution: Use proxies or respect robots.txt

3. **AI Features:**
   - ⚠️ Requires OpenAI API (costs money)
   - 🔧 Solution: Use free tier or alternative AI

4. **Email:**
   - ⚠️ Requires Resend account
   - 🔧 Solution: Use free tier (100 emails/day)

---

## 📊 PERFORMANCE TESTS

### **Test P.1: Scraping Performance**

**Steps:**
1. Add 10 competitors
2. Scrape all simultaneously
3. Measure time

**Expected:**
- ✅ < 30 seconds for 10 competitors
- ✅ No timeouts
- ✅ All snapshots saved

---

### **Test P.2: Database Performance**

**Steps:**
1. Add 100 competitors
2. List all competitors
3. Measure response time

**Expected:**
- ✅ < 1 second response time
- ✅ Proper pagination
- ✅ No memory issues

---

### **Test P.3: AI Performance**

**Steps:**
1. Generate 10 AI insights
2. Measure total time

**Expected:**
- ✅ < 5 seconds per insight
- ✅ Proper error handling
- ✅ Rate limits respected

---

## 🔧 TROUBLESHOOTING

### **Issue: Cannot login**

**Check:**
1. Is database running? `npx prisma db push`
2. Is NEXTAUTH_SECRET set in `.env`?
3. Is password correct? (8+ chars, letters + numbers)

---

### **Issue: Scraping fails**

**Check:**
1. Is URL valid and accessible?
2. Is website blocking automated access?
3. Check rate limits (5 requests/minute)

---

### **Issue: AI features not working**

**Check:**
1. Is OPENAI_API_KEY set in `.env`?
2. Is API key valid and has credits?
3. Check OpenAI API status

---

### **Issue: Background jobs not running**

**Check:**
1. Is worker running? `npm run worker`
2. Is REDIS_URL set in `.env`?
3. Is Redis server running?
4. Check worker logs for errors

---

### **Issue: Emails not sending**

**Check:**
1. Is RESEND_API_KEY set in `.env`?
2. Is API key valid?
3. Is sender email verified in Resend?
4. Check Resend dashboard for logs

---

## ✅ TEST COMPLETION CHECKLIST

Before considering testing complete:

- [ ] All authentication flows work
- [ ] Can create/read/update/delete competitors
- [ ] Scraping works and detects changes
- [ ] AI insights generate successfully
- [ ] Background jobs schedule and run
- [ ] Notifications send correctly
- [ ] Security tests all pass
- [ ] No console errors
- [ ] No database errors
- [ ] Performance is acceptable

---

## 📞 SUPPORT

If you encounter issues:

1. Check this testing guide
2. Review `SECURITY.md` for security tests
3. Check console logs for errors
4. Review database logs
5. Check API response codes
6. Verify environment variables

---

**Happy Testing! 🎉**

**Last Updated:** October 21, 2025  
**Version:** 1.0


