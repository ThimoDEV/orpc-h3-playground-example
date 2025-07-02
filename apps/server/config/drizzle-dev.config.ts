import { defineConfig } from 'drizzle-kit'
import { ENV } from '@/envCheck'

export default defineConfig({
  schema: './src/db/schema',
  out: './src/db/migrations',
  dialect: 'sqlite',
  driver: undefined,
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
})
