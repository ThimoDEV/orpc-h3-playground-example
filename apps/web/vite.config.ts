import * as path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 3000,
    open: false,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(import.meta.dirname, './src') },
      { find: '~', replacement: path.resolve(import.meta.dirname, './src') },
    ],
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      tsr: {
        tmpDir: '.tsr-temp',
      },
    }),
    tailwindcss(),
    checker({
      typescript: true,
    }),
  ].filter(Boolean),
})
