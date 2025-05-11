import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      // 将 API 请求代理到后端服务器
      '/api': {
        target: 'http://localhost:5117', // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 代理 SignalR 实时通信
      '/chathub': {
        target: 'http://localhost:5117',
        changeOrigin: true,
        ws: true // 启用 WebSocket
      }
    }
  }
})
