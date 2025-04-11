# ECharts Manager

一個基於ECharts擴充的管理器，用於輕鬆管理多個圖表實例。

## Features

- 管理多個 ECharts 實例
- 自動處理視窗大小調整
- TypeScript 支援
- 簡單易用的 API

## Installation

```bash
npm install echarts-manager
# 或
yarn add echarts-manager
```

## Usage

```typescript
import { useEChartManager } from 'echarts-manager';
import type { EChartsOption } from 'echarts-manager';

// 初始化圖表管理器
const chartManager = useEChartManager();

// 創建圖表
await chartManager.spawnCharts([
  {
    id: 'chart1',
    option: {
      title: { text: '圖表 1' },
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [1, 2, 3] }]
    }
  }
]);

// 更新單個圖表
await chartManager.updateChartOption('chart1', {
  series: [{ type: 'bar', data: [4, 5, 6] }]
});

// 更新所有圖表
await chartManager.updateAllCharts([
  {
    id: 'chart1',
    option: {
      series: [{ type: 'bar', data: [7, 8, 9] }]
    }
  }
]);

// 完成後清理
chartManager.dispose();
```

## API

### useEChartManager()

返回一個新的圖表管理器實例。

### Methods

#### spawnCharts(configs: { id: string; option: EChartsOption }[]): Promise<void>

創建多個圖表實例。

#### updateChartOption(id: string, option: EChartsOption, opts?: SetOptionOpts): Promise<void>

更新單個圖表的配置選項。

#### updateAllCharts(options: Record<string, EChartsOption> | { id: string; option: EChartsOption }[], opts?: SetOptionOpts): Promise<void>

更新多個圖表的配置選項。

#### resizeCharts(): void

調整所有圖表實例的大小。

#### setupResizeListener(delay: number = 300): void

設置帶防抖的視窗大小調整監聽器。

#### dispose(): void

清理所有圖表實例和事件監聽器。

#### getChart(id: string): ECharts | undefined

獲取指定的圖表實例。

## License

MIT
