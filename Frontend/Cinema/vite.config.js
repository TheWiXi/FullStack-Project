import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../../Backend/config',
  server: {
    host:'localhost',
    port: 3001
  },
})
