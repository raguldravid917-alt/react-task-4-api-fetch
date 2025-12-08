import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-task-4-api-fetch/',   // 👉 IMPORTANT: repo name
})
