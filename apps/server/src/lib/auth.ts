import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { anonymous } from 'better-auth/plugins'
import { useDB } from '../db/db'
import * as schema from '../db/schema/auth'
import { ENV } from '../envCheck'

export const auth = betterAuth({
  database: drizzleAdapter(useDB(), {
    provider: 'sqlite',

    schema,
  }),
  trustedOrigins: [ENV.CORS_ORIGIN],
  emailAndPassword: {
    enabled: false,
  },
  plugins: [anonymous()],
})
