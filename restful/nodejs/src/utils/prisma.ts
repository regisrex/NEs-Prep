import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { env } from './env'
config()

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL
    }
  }
})


export default prisma
