import { createEnv } from '@t3-oss/env-core'
import { config as dotenvConfig } from 'dotenv'
import { z } from 'zod'

const isServer = typeof window === 'undefined'

if (isServer) {
  dotenvConfig({ override: true })
}

process.env = {
  ...import.meta.env,
  ...process.env,
}

export const ENV = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_SERVER_URL: z.string().url(),
  },
  server: {
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: false,
})
