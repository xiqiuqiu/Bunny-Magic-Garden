import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/qwen-tts': {
        target: 'https://dashscope.aliyuncs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/qwen-tts/, '/api/v1/services/aigc/multimodal-generation/generation'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
