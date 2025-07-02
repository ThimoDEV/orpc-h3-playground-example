import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { orpc } from '@/lib/orpc'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const healthCheck = useQuery(orpc.example.healthCheck.queryOptions())

  async function createAuthUser() {
    await authClient.signIn.anonymous()
  }

  const [data, setData] = useState(0)
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-red-300 p-2 text-white">
      <h3>Welcome Home!</h3>
      <button type="button" onClick={() => setData(data + 1)}>
        Click me
      </button>
      <section className="rounded-lg border p-4">
        <h2 className="mb-2 font-medium">API Status</h2>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${healthCheck.data ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-muted-foreground">
            {healthCheck.isLoading ? 'Checking...' : healthCheck.data ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </section>
      <button type="button" onClick={createAuthUser}>
        Create Auth User
      </button>
      <p>{data}</p>
    </div>
  )
}
