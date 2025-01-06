import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url"
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [react()],
  base: './index.html',
  build: {
    input: {
      app: './index.html', // default
    },
  },
  resolve:{
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
