// Quick DB connectivity check using PrismaClient
const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  try {
    await prisma.$queryRawUnsafe('SELECT 1')
    console.log('DB OK')
  } catch (e) {
    console.error('DB ERROR:', e.code || e.message || e)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()


