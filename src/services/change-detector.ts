// ============================================
// CHANGE DETECTION SERVICE
// ============================================
// Purpose: Detect changes between snapshots
// Why: Core feature to identify what changed
// Framework: TypeScript

import { prisma } from '@/lib/db'

// ============================================
// CHANGE DETECTION TYPES
// ============================================
interface SnapshotData {
  id: string
  html?: string
  extractedData?: any
  detectedPrice?: number
  detectedText?: string
}

interface ChangeResult {
  hasChanges: boolean
  changes: Array<{
    type: string
    oldValue: string
    newValue: string
    confidence: number
  }>
}

// ============================================
// DETECT CHANGES
// ============================================
// What: Compare two snapshots and detect changes
// Why: Identify what changed on a competitor's page
// How: Compare different aspects of the snapshots

export async function detectChanges(
  competitorId: string,
  oldSnapshotId: string,
  newSnapshotId: string
): Promise<ChangeResult> {
  // ============================================
  // GET SNAPSHOTS
  // ============================================
  // What: Fetch both snapshots from database
  // Why: Need to compare them
  
  const oldSnapshot = await prisma.snapshot.findUnique({
    where: { id: oldSnapshotId },
  })
  
  const newSnapshot = await prisma.snapshot.findUnique({
    where: { id: newSnapshotId },
  })

  if (!oldSnapshot || !newSnapshot) {
    throw new Error('Snapshots not found')
  }

  const changes: ChangeResult['changes'] = []

  // ============================================
  // DETECT PRICE CHANGES
  // ============================================
  // What: Check if price changed
  // Why: Price changes are critical for competitive intelligence
  
  if (oldSnapshot.detectedPrice && newSnapshot.detectedPrice) {
    const priceDiff = Math.abs(oldSnapshot.detectedPrice - newSnapshot.detectedPrice)
    const priceChangePercent = (priceDiff / oldSnapshot.detectedPrice) * 100
    
    // Only report if price changed by more than 1%
    if (priceChangePercent > 1) {
      changes.push({
        type: 'price',
        oldValue: `$${oldSnapshot.detectedPrice}`,
        newValue: `$${newSnapshot.detectedPrice}`,
        confidence: 0.95, // High confidence for price changes
      })
    }
  }

  // ============================================
  // DETECT TEXT CONTENT CHANGES
  // ============================================
  // What: Check if text content changed
  // Why: Content changes indicate updates
  
  if (oldSnapshot.detectedText && newSnapshot.detectedText) {
    if (oldSnapshot.detectedText !== newSnapshot.detectedText) {
      changes.push({
        type: 'content',
        oldValue: truncateText(oldSnapshot.detectedText, 100),
        newValue: truncateText(newSnapshot.detectedText, 100),
        confidence: 0.8,
      })
    }
  }

  // ============================================
  // DETECT HTML CHANGES
  // ============================================
  // What: Check if HTML structure changed
  // Why: Structural changes indicate major updates
  
  if (oldSnapshot.html && newSnapshot.html) {
    const oldHtmlLength = oldSnapshot.html.length
    const newHtmlLength = newSnapshot.html.length
    const lengthDiff = Math.abs(oldHtmlLength - newHtmlLength)
    const lengthChangePercent = (lengthDiff / oldHtmlLength) * 100
    
    // Report if HTML changed by more than 5%
    if (lengthChangePercent > 5) {
      changes.push({
        type: 'structure',
        oldValue: `${oldHtmlLength} characters`,
        newValue: `${newHtmlLength} characters`,
        confidence: 0.7,
      })
    }
  }

  // ============================================
  // DETECT EXTRACTED DATA CHANGES
  // ============================================
  // What: Check if structured data changed
  // Why: Product info, features, etc.
  
  if (oldSnapshot.extractedData && newSnapshot.extractedData) {
    const oldData = JSON.stringify(oldSnapshot.extractedData)
    const newData = JSON.stringify(newSnapshot.extractedData)
    
    if (oldData !== newData) {
      changes.push({
        type: 'data',
        oldValue: truncateText(oldData, 100),
        newValue: truncateText(newData, 100),
        confidence: 0.85,
      })
    }
  }

  // ============================================
  // SAVE CHANGES TO DATABASE
  // ============================================
  // What: Store detected changes
  // Why: Keep history of all changes
  
  if (changes.length > 0) {
    for (const change of changes) {
      await prisma.change.create({
        data: {
          competitorId,
          snapshotId: newSnapshotId,
          changeType: change.type,
          oldValue: change.oldValue,
          newValue: change.newValue,
          confidence: change.confidence,
        },
      })
    }
  }

  return {
    hasChanges: changes.length > 0,
    changes,
  }
}

// ============================================
// HELPER FUNCTION - TRUNCATE TEXT
// ============================================
// What: Shorten long text for display
// Why: Keep change values manageable
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// ============================================
// CLASSIFY CHANGE TYPE
// ============================================
// What: Determine what kind of change it is
// Why: Help users understand the change
export function classifyChangeType(
  oldValue: string,
  newValue: string
): string {
  // Check if it's a price change
  if (oldValue.includes('$') && newValue.includes('$')) {
    return 'price'
  }
  
  // Check if it's a product change
  if (oldValue.toLowerCase().includes('product') || 
      newValue.toLowerCase().includes('product')) {
    return 'product'
  }
  
  // Check if it's a campaign change
  if (oldValue.toLowerCase().includes('campaign') || 
      newValue.toLowerCase().includes('campaign')) {
    return 'campaign'
  }
  
  // Default to content change
  return 'content'
}
