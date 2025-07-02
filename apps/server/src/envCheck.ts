import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const ENV = createEnv({
  server: {
    CORS_ORIGIN: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    TURSO_DB_URL: z.string().url().optional(),
    TURSO_DB_AUTH_TOKEN: z.string().optional(),
    DRIZZLE_ENV: z.enum(['development', 'production']).default('development'),
    FAL_KEY: z.string().optional(),
    PORT: z
      .string()
      .default('3001')
      .transform((s) => Number.parseInt(s, 10))
      .pipe(z.number()),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
