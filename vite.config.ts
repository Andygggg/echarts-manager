import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => {
  // 如果是 build 命令，使用庫模式構建
  if (command === 'build') {
    return {
      plugins: [
        dts({
          include: ['src'], // 只包含 src 目錄
          exclude: ['demo', '**/*.test.ts', '**/*.spec.ts'], // 排除 demo 目錄和測試文件
        })
      ],
      build: {
        outDir: 'dist', // 輸出目錄
        lib: {
          entry: 'src/index.ts', // 入口文件
          formats: ['es'], // 產生 ESM 格式
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          external: ['echarts'],
          output: {
            globals: {
              echarts: 'echarts'
            }
          }
        },
        emptyOutDir: true, // 清空輸出目錄
        copyPublicDir: false // 不複製 public 目錄
      }
    };
  }
  
  // 開發模式，直接運行 demo
  return {
    root: './demo', // 設置根目錄為 demo 目錄
    server: {
      port: 3000,
      open: true, // 自動打開瀏覽器
    },
  };
});
