import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {  
    alias: {  
      '@': path.resolve(__dirname, 'src'), 
    },
  },
  define: {
    'import.meta.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
    'import.meta.env.VITE_APP_SECRET': JSON.stringify(process.env.VITE_APP_SECRET),
    'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL),
    'import.meta.env.VITE_BASE_URL_VERSION': JSON.stringify(process.env.VITE_BASE_URL_VERSION),
  },
})