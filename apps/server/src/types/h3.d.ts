import type { auth } from '@/lib/auth'

declare module 'h3' {
  interface H3EventContext {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
