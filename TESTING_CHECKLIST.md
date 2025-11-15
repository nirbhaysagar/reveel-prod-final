# 🧪 Testing Checklist - Reveel Platform

## ✅ Features to Test

### 1. **Competitor Management** (Competitors Page)
- [ ] **View Competitors List**: Navigate to `/dashboard/competitors`
- [ ] **Add New Competitor**: 
  - Click "Add Competitor" button
  - Fill in competitor details:
    - Name (e.g., "Nike")
    - URL (e.g., "https://nike.com")
    - Platform (select from dropdown)
    - Optional: CSS selector for specific element
    - Scrape interval (e.g., 24 hours)
  - Click "Save" and verify it appears in the list
  
- [ ] **Edit Competitor**: 
  - Click on a competitor
  - Click "Edit"
  - Change some details
  - Save and verify changes

- [ ] **Delete Competitor**: 
  - Click on a competitor
  - Click "Delete"
  - Confirm deletion
  - Verify it's removed from list

### 2. **Web Scraping** (Manual Scrape)
- [ ] **Trigger Manual Scrape**:
  - Go to a competitor's detail page
  - Click "Scrape Now" or "Trigger Scrape" button
  - Wait for scrape to complete
  - Verify:
    - Success message appears
    - New snapshot is created
    - Data is displayed

### 3. **Change Detection**
- [ ] **View Changes**:
  - Go to a competitor's detail page
  - Click on "Changes" or "History" tab
  - View list of detected changes
  
- [ ] **Change Details**:
  - Click on a specific change
  - Verify:
    - Change type is displayed (e.g., "Content Change", "Price Change")
    - Old value is shown
    - New value is shown
    - Timestamp is correct

### 4. **AI Insights**
- [ ] **View Insights**:
  - Navigate to `/dashboard/insights`
  - View generated AI insights
  
- [ ] **Generate Insight for Change**:
  - Go to a specific change
  - Click "Generate Insight" or similar button
  - Wait for AI to generate insight
  - Verify insight appears and makes sense

### 5. **Reports**
- [ ] **View Reports**:
  - Navigate to `/dashboard/reports`
  - View existing reports
  
- [ ] **Generate Weekly Report**:
  - Click "Generate Report" button
  - Wait for report to generate
  - Verify:
    - Report is created
    - Summary is displayed
    - Key changes are listed
    - Recommendations are provided

### 6. **Notifications**
- [ ] **View Notifications**:
  - Navigate to `/dashboard/notifications`
  - View notifications list
  
- [ ] **Mark as Read**:
  - Click on a notification
  - Or click "Mark as Read" button
  - Verify notification is marked as read

### 7. **Jobs/Scraping Queue**
- [ ] **View Jobs**:
  - Navigate to `/dashboard/jobs`
  - View active scraping jobs
  
- [ ] **Job Status**:
  - Verify job statuses are displayed correctly
  - Check for any failed jobs

### 8. **API Endpoints** (Optional - Using Browser DevTools/Postman)
```bash
# Test API endpoints directly:

# Get all competitors
GET http://localhost:3001/api/competitors

# Create a competitor
POST http://localhost:3001/api/competitors
Body: {
  "name": "Test Competitor",
  "url": "https://example.com",
  "platform": "website",
  "scrapeInterval": 24
}

# Get a specific competitor
GET http://localhost:3001/api/competitors/{id}

# Trigger scrape
POST http://localhost:3001/api/competitors/{id}/scrape

# Get changes for a competitor
GET http://localhost:3001/api/competitors/{id}/changes

# Get all notifications
GET http://localhost:3001/api/notifications

# Generate report
POST http://localhost:3001/api/reports/generate

# Get job status
GET http://localhost:3001/api/jobs/status
```

## 🎯 Critical Workflows to Test

### Workflow 1: Complete Competitor Setup
1. Add a new competitor
2. Trigger initial scrape
3. Wait for scrape to complete
4. View the snapshot
5. Trigger another scrape after making a change to the website
6. View detected changes

### Workflow 2: AI Insight Generation
1. Find a change that was detected
2. Generate an AI insight for it
3. Read the insight to verify it makes sense
4. Share or use the insight for decision-making

### Workflow 3: Report Generation
1. Add multiple competitors
2. Trigger several scrapes
3. Generate a weekly report
4. Review the report for:
   - Summary of activity
   - Key changes detected
   - Recommendations

## 🐛 Common Issues to Watch For

- [ ] Scraping fails (check console for errors)
- [ ] Changes not detected properly
- [ ] AI insights not generating
- [ ] Notifications not appearing
- [ ] Jobs stuck in "pending" status
- [ ] API errors (check Network tab in DevTools)

## 📝 Notes While Testing

Document any issues you find:
- What page/feature
- What you expected
- What actually happened
- Any error messages (take screenshots if possible)

## ✅ Completion

Once all tests pass, the platform is ready for production use with authentication re-enabled!
