import { EChartsOption, ECharts, SetOptionOpts } from 'echarts';
declare class EChartsManager {
    private chartInstances;
    private resizeHandler;
    /**
     * 生成多表單
     * @param configs 全部圖表參數
     */
    spawnCharts(configs: {
        id: string;
        option: EChartsOption;
    }[]): Promise<void>;
    /**
     * 生成單一表單
     * @param id dom元素
     * @param option 圖表參數
     */
    private spawnChart;
    /**
     * 更新單一圖表
     * @param id dom元素id
     * @param option 更新參數
     * @param opts eChart 配置選項
     */
    updateChartOption(id: string, option: EChartsOption, opts?: SetOptionOpts): Promise<void>;
    /**
    * 更新所有圖表
    * @param optionsMap id和options的映射對象
    * @param opts eChart 配置選項
    */
    updateAllCharts(options: Record<string, EChartsOption> | {
        id: string;
        option: EChartsOption;
    }[], opts?: SetOptionOpts): Promise<void>;
    /**
     * 調整圖表大小
     */
    resizeCharts(): void;
    /**
     * 設置窗口大小監聽
     * @param delay 延遲觸發時間
     */
    setupResizeListener(delay?: number): void;
    /**
     * 清理方法
     */
    dispose(): void;
    private debounce;
    /**
     * 獲取指定圖表實例
     * @param id DOM元素id
     * @returns
     */
    getChart(id: string): ECharts | undefined;
}
export declare function useEChartManager(): EChartsManager;
export {};
