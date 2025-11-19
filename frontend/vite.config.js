import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// prove config is loading
console.log('*** VITE CONFIG LOADED ***')

function apiRequestLogger() {
  return {
    name: 'api-request-logger',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.startsWith('/api')) {
          console.log('[api] →', req.method, req.url)
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), apiRequestLogger()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      }
    }
  }
})
