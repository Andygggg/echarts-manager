import * as i from "echarts";
class c {
  constructor() {
    this.chartInstances = /* @__PURE__ */ new Map(), this.resizeHandler = null;
  }
  /**
   * 生成多表單
   * @param configs 全部圖表參數
   */
  async spawnCharts(e) {
    this.resizeHandler || this.setupResizeListener();
    const s = e.map(
      ({ id: t, option: r }) => this.spawnChart(t, r)
    );
    await Promise.all(s);
  }
  /**
   * 生成單一表單
   * @param id dom元素
   * @param option 圖表參數
   */
  async spawnChart(e, s) {
    return new Promise((t) => {
      setTimeout(() => {
        const r = document.getElementById(e);
        if (!r) {
          t();
          return;
        }
        const n = i.getInstanceByDom(r) || i.init(r);
        n.setOption(s), this.chartInstances.set(e, n), t();
      }, 0);
    });
  }
  /**
   * 更新單一圖表
   * @param id dom元素id
   * @param option 更新參數
   * @param opts eChart 配置選項
   */
  async updateChartOption(e, s, t) {
    return new Promise((r) => {
      const a = this.chartInstances.get(e);
      a && a.setOption(s, t), r();
    });
  }
  /**
  * 更新所有圖表
  * @param optionsMap id和options的映射對象
  * @param opts eChart 配置選項
  */
  async updateAllCharts(e, s) {
    const t = [];
    Array.isArray(e) ? e.forEach(({ id: r, option: a }) => {
      const n = this.updateChartOption(r, a, s);
      t.push(n);
    }) : Object.entries(e).forEach(([r, a]) => {
      const n = this.updateChartOption(r, a, s);
      t.push(n);
    }), await Promise.all(t);
  }
  /**
   * 調整圖表大小
   */
  resizeCharts() {
    this.chartInstances.forEach((e) => e.resize());
  }
  /**
   * 設置窗口大小監聽
   * @param delay 延遲觸發時間
   */
  setupResizeListener(e = 300) {
    this.resizeHandler = () => {
      this.debounce(() => {
        this.resizeCharts();
      }, e)();
    }, window.addEventListener("resize", this.resizeHandler);
  }
  /**
   * 清理方法
   */
  dispose() {
    this.resizeHandler && window.removeEventListener("resize", this.resizeHandler), this.chartInstances.forEach((e, s) => {
      e.dispose(), this.chartInstances.delete(s);
    });
  }
  // 防抖
  debounce(e, s) {
    let t = null;
    return () => {
      t && clearTimeout(t), t = setTimeout(() => {
        e(), t = null;
      }, s);
    };
  }
  /**
   * 獲取指定圖表實例
   * @param id DOM元素id
   * @returns
   */
  getChart(e) {
    return this.chartInstances.get(e);
  }
}
function o() {
  return new c();
}
export {
  o as useEChartManager
};
