import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { orpc } from '@/lib/orpc'

export const Route = createFileRoute('/private')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useQuery(orpc.example.privateData.queryOptions())
  // const imageData = useQuery(
  //   orpc.example.generateImage.queryOptions({
  //     input: {
  //       provider: 'google',
  //       model: 'imagen-3.0-generate-001',
  //       prompt: 'A beautiful sunset over a calm ocean',
  //       n: 1,
  //       size: '1024x1024',
  //     },
  //   }),
  // )

  return (
    <div>
      <h1>Private Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
