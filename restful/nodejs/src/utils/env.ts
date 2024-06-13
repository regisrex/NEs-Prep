import { config } from 'dotenv'
import z from 'zod'
config()

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  SMTP_SERVER: z.string(),
  SMTP_HOST: z.string(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
})

export const env = envSchema.parse({ ...process.env })
