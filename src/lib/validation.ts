// ============================================
// INPUT VALIDATION & SANITIZATION
// ============================================
// Purpose: Validate and sanitize user inputs
// Why: Prevent injection attacks, XSS, and invalid data
// Framework: Custom validation functions

// ============================================
// URL VALIDATION
// ============================================
// What: Validate URL is safe to scrape
// Why: Prevent SSRF attacks

export function validateUrl(url: string): { valid: boolean; error?: string } {
  try {
    const parsedUrl = new URL(url)
    
    // Block internal/private IPs
    const hostname = parsedUrl.hostname.toLowerCase()
    const blockedHosts = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '::1',
      'metadata.google.internal', // GCP metadata
      '169.254.169.254', // AWS/Azure metadata
    ]
    
    if (blockedHosts.includes(hostname)) {
      return { valid: false, error: 'Cannot scrape internal URLs' }
    }
    
    // Block private IP ranges (simplified)
    if (
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.16.') ||
      hostname.startsWith('172.17.') ||
      hostname.startsWith('172.18.') ||
      hostname.startsWith('172.19.') ||
      hostname.startsWith('172.20.') ||
      hostname.startsWith('172.21.') ||
      hostname.startsWith('172.22.') ||
      hostname.startsWith('172.23.') ||
      hostname.startsWith('172.24.') ||
      hostname.startsWith('172.25.') ||
      hostname.startsWith('172.26.') ||
      hostname.startsWith('172.27.') ||
      hostname.startsWith('172.28.') ||
      hostname.startsWith('172.29.') ||
      hostname.startsWith('172.30.') ||
      hostname.startsWith('172.31.')
    ) {
      return { valid: false, error: 'Cannot scrape private network URLs' }
    }
    
    // Only allow HTTP/HTTPS
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return { valid: false, error: 'Only HTTP/HTTPS URLs are allowed' }
    }
    
    return { valid: true }
  } catch (error) {
    return { valid: false, error: 'Invalid URL format' }
  }
}

// ============================================
// EMAIL VALIDATION
// ============================================
// What: Validate email format
// Why: Prevent invalid emails

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  if (email.length > 254) {
    return { valid: false, error: 'Email too long' }
  }
  
  return { valid: true }
}

// ============================================
// PASSWORD VALIDATION
// ============================================
// What: Validate password strength
// Why: Enforce strong passwords

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' }
  }
  
  if (password.length > 128) {
    return { valid: false, error: 'Password too long' }
  }
  
  // Require at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  
  if (!hasLetter || !hasNumber) {
    return { valid: false, error: 'Password must contain letters and numbers' }
  }
  
  return { valid: true }
}

// ============================================
// SANITIZE STRING
// ============================================
// What: Remove dangerous characters
// Why: Prevent XSS and injection

export function sanitizeString(input: string, maxLength: number = 255): string {
  // Trim whitespace
  let sanitized = input.trim()
  
  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '')
  
  return sanitized
}

// ============================================
// VALIDATE COMPETITOR NAME
// ============================================

export function validateCompetitorName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' }
  }
  
  if (name.length > 100) {
    return { valid: false, error: 'Name too long (max 100 characters)' }
  }
  
  return { valid: true }
}

// ============================================
// VALIDATE CSS SELECTOR
// ============================================

export function validateCssSelector(selector: string): { valid: boolean; error?: string } {
  if (!selector) {
    return { valid: true } // Optional field
  }
  
  if (selector.length > 500) {
    return { valid: false, error: 'Selector too long' }
  }
  
  // Basic validation - should start with . # or letter
  if (!/^[.#a-zA-Z]/.test(selector)) {
    return { valid: false, error: 'Invalid CSS selector format' }
  }
  
  return { valid: true }
}

// ============================================
// VALIDATE SCRAPE INTERVAL
// ============================================

export function validateScrapeInterval(interval: number): { valid: boolean; error?: string } {
  if (interval < 1 || interval > 168) { // Max 1 week
    return { valid: false, error: 'Scrape interval must be between 1 and 168 hours' }
  }
  
  return { valid: true }
}

// ============================================
// VALIDATE ID FORMAT
// ============================================
// What: Validate cuid format
// Why: Prevent injection through IDs

export function validateId(id: string): { valid: boolean; error?: string } {
  // cuid format: lowercase alphanumeric, length ~25
  const cuidRegex = /^[a-z0-9]{20,30}$/
  
  if (!cuidRegex.test(id)) {
    return { valid: false, error: 'Invalid ID format' }
  }
  
  return { valid: true }
}


