import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: 'src',
  publicDir: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        simple: 'src/simple.html',
        advanced: 'src/advanced.html',
        usage: 'src/usage.html',
        api: 'src/api.html',
        index: 'src/index.html'
      }
    }
  }
})
