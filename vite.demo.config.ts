import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/echarts-manager/' : './', // 本地開發使用相對路徑
  root: './demo',
  build: {
    outDir: '../demo-dist',  // 修改為專案根目錄
    emptyOutDir: true,
    assetsDir: 'assets', // 指定靜態資源目錄
    rollupOptions: {
      output: {
        manualChunks: {
          'echarts': ['echarts'],  // 將 echarts 分離成單獨的 chunk
        }
      }
    },
    chunkSizeWarningLimit: 1000,  // 提高警告限制到 1000KB
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}); 