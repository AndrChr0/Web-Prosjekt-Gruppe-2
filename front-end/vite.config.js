/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
  },
  server: {
    port: 8082,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8082",
   },
})
