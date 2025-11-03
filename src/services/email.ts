// ============================================
// EMAIL SERVICE - Resend
// ============================================
// Purpose: Send email notifications
// Why: Alert users of important changes
// Framework: Resend API

import { Resend } from 'resend'

// ============================================
// INITIALIZE RESEND
// ============================================
// What: Create Resend client
// Why: Send emails through Resend

const resend = new Resend(process.env.RESEND_API_KEY)

// ============================================
// SEND CHANGE ALERT EMAIL
// ============================================
// What: Email user about a detected change
// Why: Keep users informed of competitor activity

export async function sendChangeAlertEmail(
  userEmail: string,
  userName: string,
  competitorName: string,
  changeType: string,
  oldValue: string,
  newValue: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Reveel <notifications@yourdomain.com>',
      to: userEmail,
      subject: `🔍 Change Detected: ${competitorName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .change-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .change-type { font-weight: bold; color: #667eea; text-transform: uppercase; font-size: 12px; }
            .values { display: flex; justify-content: space-between; margin: 15px 0; }
            .old-value { color: #ef4444; text-decoration: line-through; }
            .new-value { color: #10b981; font-weight: bold; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔍 Change Detected</h1>
              <p>Competitive Intelligence Alert</p>
            </div>
            <div class="content">
              <h2>Hi ${userName},</h2>
              <p>We detected a change in one of your tracked competitors:</p>
              
              <div class="change-card">
                <div class="change-type">${changeType}</div>
                <h3 style="margin: 10px 0;">${competitorName}</h3>
                <div class="values">
                  <div>
                    <div style="color: #6b7280; font-size: 12px;">OLD VALUE</div>
                    <div class="old-value">${oldValue}</div>
                  </div>
                  <div style="font-size: 24px;">→</div>
                  <div>
                    <div style="color: #6b7280; font-size: 12px;">NEW VALUE</div>
                    <div class="new-value">${newValue}</div>
                  </div>
                </div>
              </div>
              
              <a href="${process.env.NEXTAUTH_URL}/dashboard/competitors" class="button">
                View in Dashboard
              </a>
              
              <div class="footer">
                <p>This is an automated notification from Reveel</p>
                <p>You're tracking ${competitorName} for competitive intelligence</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      return false
    }

    console.log('Email sent successfully:', data)
    return true
    
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// ============================================
// SEND WEEKLY REPORT EMAIL
// ============================================
// What: Email weekly competitive intelligence report
// Why: Keep users updated on all competitor activity

export async function sendWeeklyReportEmail(
  userEmail: string,
  userName: string,
  reportData: {
    summary: string
    keyChanges: string[]
    recommendations: string[]
  }
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Reveel <notifications@yourdomain.com>',
      to: userEmail,
      subject: `📊 Weekly Competitive Intelligence Report`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .section-title { color: #667eea; font-weight: bold; margin-bottom: 15px; }
            ul { list-style: none; padding: 0; }
            li { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            li:last-child { border-bottom: none; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Weekly Report</h1>
              <p>Competitive Intelligence Summary</p>
            </div>
            <div class="content">
              <h2>Hi ${userName},</h2>
              <p>Here's your weekly competitive intelligence report:</p>
              
              <div class="section">
                <div class="section-title">EXECUTIVE SUMMARY</div>
                <p>${reportData.summary}</p>
              </div>
              
              <div class="section">
                <div class="section-title">KEY CHANGES</div>
                <ul>
                  ${reportData.keyChanges.map(change => `<li>• ${change}</li>`).join('')}
                </ul>
              </div>
              
              <div class="section">
                <div class="section-title">STRATEGIC RECOMMENDATIONS</div>
                <ul>
                  ${reportData.recommendations.map(rec => `<li>• ${rec}</li>`).join('')}
                </ul>
              </div>
              
              <a href="${process.env.NEXTAUTH_URL}/dashboard/insights" class="button">
                View Full Report
              </a>
              
              <div class="footer">
                <p>This is your weekly automated report from Reveel</p>
                <p>Generated with AI-powered competitive intelligence</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      return false
    }

    console.log('Weekly report email sent successfully:', data)
    return true
    
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
