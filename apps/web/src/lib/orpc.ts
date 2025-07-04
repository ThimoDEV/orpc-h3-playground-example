import type { RouterClient } from '@orpc/server'
import type { appRouter } from '../../../server/src/api/root'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ENV } from '@/env'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`Error: ${error.message}`, {
        action: {
          label: 'retry',
          onClick: () => {
            queryClient.invalidateQueries()
          },
        },
      })
    },
  }),
})

export const link = new RPCLink({
  url: `${ENV.VITE_SERVER_URL}/rpc`,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: 'include',
    })
  },
})

export const client: RouterClient<typeof appRouter> = createORPCClient(link)

export const orpc = createTanstackQueryUtils(client)
