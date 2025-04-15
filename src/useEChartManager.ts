import * as echarts from "echarts";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";

class EChartsManager {
  private chartInstances: Map<string, ECharts> = new Map();
  private resizeHandler: (() => void) | null = null;

  //=========================生成圖表===========================================

  /**
   * 生成單一表單
   * @param id dom元素
   * @param option 圖表參數
   */
  private async spawnChart(id: string, option: EChartsOption): Promise<undefined | ECharts> {
    return new Promise<undefined | ECharts>((resolve) => {
      // 使用 nextTick 或 setTimeout 確保 DOM 已經準備好
      setTimeout(() => {
        const chartDom = document.getElementById(id);
        if (!chartDom) {
          resolve(undefined); // 如果找不到 DOM，直接 resolve
          return;
        }

        // 檢查是否已存在圖表實例
        const existingChart = echarts.getInstanceByDom(chartDom);
        const chartInstance = existingChart || echarts.init(chartDom);

        chartInstance.setOption(option);
        this.chartInstances.set(id, chartInstance);
        resolve(chartInstance);
        return;
      }, 0);
    });
  }

  /**
   * 生成多表單
   * @param configs 全部圖表參數
   */
  public async spawnCharts(
    configs: { id: string; option: EChartsOption }[]
  ): Promise<{ id: string; echartsInstance: undefined | ECharts }[]> {
    const results = await Promise.all(
      configs.map(async ({ id, option }) => {
        const msg = await this.spawnChart(id, option);
        return { id, echartsInstance: msg };
      })
    );
    return results;
  }

  //=========================更新圖表===========================================

  /**
   * 更新單一圖表
   * @param id dom元素id
   * @param option 更新參數
   * @param opts eChart 配置選項
   */
  public async updateChartOption(
    id: string,
    option: EChartsOption,
    opts?: SetOptionOpts
  ): Promise<{ id: string; success: boolean; echartsInstance: undefined | ECharts }> {
    return new Promise<{ id: string; success: boolean; echartsInstance: undefined | ECharts }>((resolve) => {
      const chart = this.chartInstances.get(id);
      if (chart) {
        chart.setOption(option, opts);
        resolve({ id, success: true, echartsInstance: chart });
      } else {
        resolve({ id, success: false, echartsInstance: chart });
      }
    });
  }

   /**
   * 更新所有圖表
   * @param optionsMap id和options的映射對象
   * @param opts eChart 配置選項
   */
   public async updateAllCharts(
    options: Record<string, EChartsOption> | { id: string; option: EChartsOption }[],
    opts?: SetOptionOpts
  ): Promise<{ id: string; success: boolean; echartsInstance: undefined | ECharts }[]> {
    const updatePromises: Promise<{ id: string; success: boolean; echartsInstance: undefined | ECharts }>[] = [];

    // 判斷參數類型並處理
    if (Array.isArray(options)) {
      options.forEach(({ id, option }) => {
        const updatePromise = this.updateChartOption(id, option, opts);
        updatePromises.push(updatePromise);
      });
    } else {
      Object.entries(options).forEach(([id, option]) => {
        const updatePromise = this.updateChartOption(id, option, opts);
        updatePromises.push(updatePromise);
      });
    }

    return Promise.all(updatePromises);
  }

  //=========================調整圖表大小========================================

  /**
   * 調整圖表大小
   */
  public resizeCharts(): void {
    this.chartInstances.forEach((chart) => chart.resize());
  }

  /**
   * 設置窗口大小監聽
   * @param delay 延遲觸發時間
   */
  public setupResizeListener(delay: number = 300): void {
    if(this.resizeHandler) return

    this.resizeHandler = () => {
      // 使用防抖
      const debounceResize = this.debounce(() => {
        this.resizeCharts();
      }, delay);
      debounceResize();
    };

    window.addEventListener("resize", this.resizeHandler);
  }

  /**
   * 清理方法
   */
  public dispose(): void {
    // 移除窗口監聽
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }

    // 銷毀所有圖表實例
    this.chartInstances.forEach((chart, id) => {
      chart.dispose();
      this.chartInstances.delete(id);
    });
  }

  //=========================其他===============================================

  // 防抖
  private debounce(func: () => void, delay: number): () => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func();
        timeoutId = null;
      }, delay);
    };
  }

  /**
   * 獲取指定圖表實例
   * @param id DOM元素id
   * @returns
   */
  public getChart(id: string): ECharts | undefined {
    return this.chartInstances.get(id);
  }
}

// 方法包裝
export const useEChartManager = () => {
  const chartManager = new EChartsManager();
  chartManager.setupResizeListener()
  
  return chartManager;
}
