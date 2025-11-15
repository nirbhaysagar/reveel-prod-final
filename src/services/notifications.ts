// ============================================
// NOTIFICATION SERVICE
// ============================================
// Purpose: Send notifications via multiple channels
// Why: Alert users through email, Slack, and in-app
// Framework: Multiple notification providers

import { prisma } from '@/lib/db'
import { sendChangeAlertEmail, sendWeeklyReportEmail } from './email'

// ============================================
// SEND CHANGE NOTIFICATION
// ============================================
// What: Notify user about a detected change
// Why: Keep users informed of competitor activity

export async function sendChangeNotification(
  userId: string,
  competitorName: string,
  changeType: string,
  oldValue: string,
  newValue: string
) {
  // Get user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    console.error('User not found')
    return
  }

  // ============================================
  // SEND EMAIL NOTIFICATION
  // ============================================
  await sendChangeAlertEmail(
    user.email,
    user.name || 'User',
    competitorName,
    changeType,
    oldValue,
    newValue
  )

  // ============================================
  // CREATE IN-APP NOTIFICATION
  // ============================================
  await prisma.notification.create({
    data: {
      userId: user.id,
      type: 'in_app',
      title: `Change Detected: ${competitorName}`,
      message: `${changeType}: ${oldValue} → ${newValue}`,
    },
  })

  console.log(`Sent change notification to user ${userId}`)
}

// ============================================
// SEND WEEKLY REPORT NOTIFICATION
// ============================================
// What: Notify user about weekly report
// Why: Keep users updated on all activity

export async function sendWeeklyReportNotification(
  userId: string,
  reportData: {
    summary: string
    keyChanges: string[]
    recommendations: string[]
  }
) {
  // Get user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    console.error('User not found')
    return
  }

  // ============================================
  // SEND EMAIL NOTIFICATION
  // ============================================
  await sendWeeklyReportEmail(
    user.email,
    user.name || 'User',
    reportData
  )

  // ============================================
  // CREATE IN-APP NOTIFICATION
  // ============================================
  await prisma.notification.create({
    data: {
      userId: user.id,
      type: 'in_app',
      title: 'Weekly Report Ready',
      message: 'Your weekly competitive intelligence report is ready',
    },
  })

  console.log(`Sent weekly report notification to user ${userId}`)
}

// ============================================
// MARK NOTIFICATION AS READ
// ============================================
// What: Mark in-app notification as read
// Why: Track which notifications user has seen

export async function markNotificationAsRead(notificationId: string) {
  await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  })
}

// ============================================
// GET USER NOTIFICATIONS
// ============================================
// What: Get all notifications for a user
// Why: Display in dashboard

export async function getUserNotifications(userId: string, limit = 20) {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

// ============================================
// GET UNREAD COUNT
// ============================================
// What: Count unread notifications
// Why: Display badge count

export async function getUnreadCount(userId: string) {
  return await prisma.notification.count({
    where: { 
      userId,
      isRead: false,
    },
  })
}
