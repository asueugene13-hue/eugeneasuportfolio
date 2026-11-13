import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The Spline runtime ships as large chunks, but they are lazy-loaded
    // (not part of the initial bundle), so the default 500 kB warning is noise.
    chunkSizeWarningLimit: 1000,
  },
})
