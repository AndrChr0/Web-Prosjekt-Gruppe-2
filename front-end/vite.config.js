/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
  },
  preview: {
    port: 8082,
    strictPort: true,
  },
  server: {
    port: 8082,
    strictPort: true,
    host: true,
    proxy: {
      // Proxy API calls to the backend server
      '/api': {
        target: process.env.VITE_URL || 'http://localhost:8092',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
