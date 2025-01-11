import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ให้แอปพลิเคชันฟังจากทุก IP
    port: 3000, // กำหนดพอร์ตที่คุณต้องการให้แอปฟัง
  },
})
