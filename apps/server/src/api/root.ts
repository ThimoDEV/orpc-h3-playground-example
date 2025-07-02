import { exampleRouter } from './routers/example'

export const appRouter = {
  example: exampleRouter,
}

export type AppRouter = typeof appRouter
