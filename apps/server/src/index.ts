import { RPCHandler } from '@orpc/server/fetch'
import { H3, handleCors, isPreflightRequest, serve } from 'h3'
import { appRouter } from '@/api/root'
import { ENV } from '@/envCheck'
import { auth } from '@/lib/auth'
import { CORSPlugin } from '@orpc/server/plugins'
import { createContext } from '@/lib/context'
import 'dotenv/config'

const app = new H3()

// #region: Middleware
app.use('/**', async (event) => {
  console.log('middleware')
  const session = await auth.api.getSession({ headers: event.req.headers })

  console.log('session', session)
  if (!session) {
    event.context.user = null
    event.context.session = null
  }

  event.context.user = session?.user ?? null
  event.context.session = session?.session ?? null
})

app.use('/**', async (event) => {
  const corsRes = handleCors(event, {
    origin: ['http://localhost:3000'],
    preflight: {
      statusCode: 204,
    },
    methods: '*',
  })
  if (corsRes === false || corsRes === '') {
    if (isPreflightRequest(event)) {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '3600',
        },
      })
    }
  }
  
})
// #endregion: Middleware

// #region: RPC
const handler = new RPCHandler(appRouter, {
  plugins: [
    new CORSPlugin({
      origin: ['http://localhost:3000'],
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
    }),
  ],
})
app.use('/rpc/**', async (event, next) => {
  const context = await createContext(event)
  const { matched, response } = await handler.handle(event.req, {
    prefix: '/rpc',
    context,
  })
  if (matched) {
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    return response
  }
})
// #endregion: RPC

// #region: Base Routes
app.get('/ping', () => {
  return 'pong!!!'
})

app
  .on('POST', '/api/auth/**', (event) => auth.handler(event.req))
  .on('GET', '/api/auth/**', (event) => auth.handler(event.req))
// #endregion Base Routes

serve(app, {
  port: ENV.PORT,
})
