import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://20.51.155.134:5000', // ← Passe den Port ggf. an dein Backend an
        changeOrigin: true,
        secure: false
      }
    }
  }
})
