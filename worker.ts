// ============================================
// BACKGROUND WORKER PROCESS
// ============================================
// Purpose: Run background jobs
// Why: Separate process for job processing
// How: Run this as a separate Node.js process

import { scrapingWorker } from './src/services/queue'
import { scheduleScraping } from './src/services/queue'

async function start() {
  console.log('🚀 Starting background worker...')
  
  // Schedule initial scraping jobs
  await scheduleScraping()
  
  console.log('✅ Background worker started successfully')
  console.log('📊 Monitoring job queue...')
  
  // Keep process alive
  process.on('SIGTERM', async () => {
    console.log('🛑 Shutting down worker...')
    await scrapingWorker.close()
    process.exit(0)
  })
}

start().catch(console.error)
