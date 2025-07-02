import type { H3Event } from 'h3'
import type { Context as HonoContext } from 'hono'
import { auth } from './auth'

// interface CreateContextOptions {
//   context: HonoContext
// }

// export async function createContext({ context }: CreateContextOptions) {
//   const session = await auth.api.getSession({
//     headers: context.req.raw.headers,
//   })
//   return {
//     session,
//   }
// }

export async function createContext(event: H3Event) {
  const session = await auth.api.getSession({
    headers: event.req.headers,
  })
  return {
    session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
