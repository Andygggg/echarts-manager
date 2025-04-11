# ECharts Manager

一個輕量級的 ECharts 管理器，用於輕鬆管理多個圖表實例。

## 線上演示

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://andygggg.github.io/echarts-manager/)

## 安裝

```bash
# 使用 npm
npm install @andy/echarts-manager

# 使用 yarn
yarn add @andy/echarts-manager
```

## 使用方式

```typescript
import { useEChartManager } from '@andy/echarts-manager'

// 初始化圖表管理器
const chartManager = useEChartManager()

// 生成圖表
await chartManager.spawnCharts([
  { id: 'chart1', option: option1 },
  { id: 'chart2', option: option2 }
])

// 更新圖表
await chartManager.updateChartOption('chart1', newOption)

// 銷毀圖表
chartManager.dispose()
```

## 功能特點

- 支援多個圖表實例管理
- 提供圖表生成、更新、銷毀等功能
- 自動處理圖表大小調整
- TypeScript 支援

## 文件

詳細的使用說明和 API 文件請參考 [線上文檔](https://andygggg.github.io/echarts-manager/)。

## License

MIT
