import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { useEChartManager } from '../src'
import './style.css'

// 初始化圖表管理器
const chartManager = useEChartManager()

// 圓餅圖配置
const pieOption: EChartsOption = {
  title: {
    text: '圓餅圖',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicInOut',
  series: [
    {
      name: 'value',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'A' },
        { value: 735, name: 'B' },
        { value: 580, name: 'C' },
        { value: 484, name: 'D' },
        { value: 300, name: 'E' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}

// 長條圖配置
const barOption: EChartsOption = {
  title: {
    text: '長條圖',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: 'value',
  },
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicInOut',
  series: [
    {
      name: 'value',
      type: 'bar',
      barWidth: '60%',
      data: [150, 230, 224, 218, 135, 147, 260],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
      },
    },
  ],
}

// 折線圖配置
const lineOption: EChartsOption = {
  title: {
    text: '折線圖',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['value'],
    top: 30,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  },
  yAxis: {
    type: 'value',
  },
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicInOut',
  series: [
    {
      name: 'value',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(128, 255, 165, 0.5)' },
          { offset: 1, color: 'rgba(1, 191, 236, 0)' },
        ]),
      },
      smooth: true,
    },
  ],
}

// 獲取按鈕元素
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement
const destroyBtn = document.getElementById('destroyBtn') as HTMLButtonElement
const chartSelector = document.getElementById('chartSelector') as HTMLSelectElement
const updateSingleBtn = document.getElementById('updateSingleBtn') as HTMLButtonElement
const updateAllBtn = document.getElementById('updateAllBtn') as HTMLButtonElement

// 生成圖表函數
const generateCharts = async () => {
  try {
    const results = await chartManager.spawnCharts([
      { id: 'pieChart', option: pieOption },
      { id: 'barChart', option: barOption },
      { id: 'lineChart', option: lineOption },
    ])
    console.log(results)
  } catch (error) {
    console.error('生成圖表時發生錯誤：', error)
  }
}

// 銷毀圖表函數
const destroyCharts = () => {
  try {
    chartManager.dispose()
  } catch (error) {
    console.error('銷毀圖表時發生錯誤：', error)
  }
}

// 生成隨機數據的函數
const generateRandomData = (): Record<string, EChartsOption> => {
  return {
    pieChart: {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      series: [
        {
          data: [
            { value: Math.random() * 1000, name: '範例A' },
            { value: Math.random() * 1000, name: '範例B' },
            { value: Math.random() * 1000, name: '範例C' },
            { value: Math.random() * 1000, name: '範例D' },
            { value: Math.random() * 1000, name: '範例E' },
          ],
        },
      ],
    },
    barChart: {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      series: [
        {
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 300)),
        },
      ],
    },
    lineChart: {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      series: [
        {
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1500)),
        },
      ],
    },
  }
}

// 監聽下拉選單變化
const handleChartSelect = () => {
  updateSingleBtn.disabled = !chartSelector.value
}

// 更新單個圖表
const updateSingleChart = async () => {
  const selectedChart = chartSelector.value
  if (selectedChart) {
    try {
      const updateOptions = generateRandomData()
      const result = await chartManager.updateChartOption(
        selectedChart,
        updateOptions[selectedChart as keyof typeof updateOptions],
      )
      console.log(result);
    } catch (error) {
      console.error('更新圖表時發生錯誤：', error)
    }
  }
}

// 更新所有圖表
const updateAllCharts = async () => {
  try {
    const updateOptions = generateRandomData()
    const results = await chartManager.updateAllCharts(updateOptions)
    console.log(results)
    const errorResults = results.filter((result) => !result.success)
    if (errorResults.length > 0) {
      alert(`更新圖表 ${errorResults.map((result) => result.id).join(', ')} 失敗`)
    }
  } catch (error) {
    console.error('更新圖表時發生錯誤：', error)
  }
}

// 添加事件監聽器
chartSelector.addEventListener('change', handleChartSelect)
updateSingleBtn.addEventListener('click', updateSingleChart)
updateAllBtn.addEventListener('click', updateAllCharts)
generateBtn.addEventListener('click', generateCharts)
destroyBtn.addEventListener('click', destroyCharts)

// 頁面加載時自動生成圖表
generateCharts()
