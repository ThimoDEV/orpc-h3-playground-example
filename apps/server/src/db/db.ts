import { createClient as createLibSQLClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { ENV } from '../envCheck'
import { schema } from './schema'

type DbType = ReturnType<typeof drizzle<typeof schema>>

let _db: DbType | null = null

export function useDB() {
  if (!_db) {
    if (ENV.DRIZZLE_ENV === `development`) {
      _db = drizzle({
        connection: {
          url: ENV.DATABASE_URL,
        },
      })
    } else if (ENV.TURSO_DB_URL && ENV.TURSO_DB_AUTH_TOKEN) {
      // Turso in production
      _db = drizzle(
        createLibSQLClient({
          url: ENV.TURSO_DB_URL,
          authToken: ENV.TURSO_DB_AUTH_TOKEN,
        }),
        { schema },
      )
    } else {
      throw new Error(`No database configured for production`)
    }
  }
  return _db
}
