import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.JSX", "**/*.js"],
  plugins: [react()],
})
