import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is configurable via VITE_BASE_URL env variable.
// Default: '/' (root domain, e.g. domain.com/)
// Subdirectory example: '/invitation-online-anniversary-mades-warung/'
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || '/',
}))
