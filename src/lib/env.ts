// ============================================
// ENVIRONMENT VARIABLE VALIDATION
// ============================================
// Purpose: Validate required environment variables exist
// Why: Fail fast if config is missing
// Framework: TypeScript

export function validateEnvVariables() {
  const required = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }

  const missing: string[] = []

  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      missing.push(key)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file.'
    )
  }
}

export function validateOptionalEnvVariables() {
  const warnings: string[] = []

  if (!process.env.OPENAI_API_KEY) {
    warnings.push('OPENAI_API_KEY not set - AI features will not work')
  }

  if (!process.env.REDIS_URL) {
    warnings.push('REDIS_URL not set - Background jobs will not work')
  }

  if (!process.env.RESEND_API_KEY) {
    warnings.push('RESEND_API_KEY not set - Email notifications will not work')
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Optional environment variables missing:')
    warnings.forEach(warning => console.warn(`   - ${warning}`))
  }
}


