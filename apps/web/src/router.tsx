import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { scan } from 'react-scan'
import Loader from '@/components/loader.tsx'
import { orpc, queryClient } from '@/lib/orpc.ts'

import { routeTree } from './routeTree.gen.ts'
import '@/styles/tailwind.css'

if (import.meta.env.DEV) {
  scan({
    enabled: true,
  })
}

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultOnCatch(error, errorInfo) {
      console.error(error, errorInfo)
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      orpc,
      queryClient,
    },
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: (props) => {
      return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
