/**
 * TradingView Stock Heatmap Component
 *
 * Displays an interactive stock market heatmap showing
 * sector performance with color-coded blocks.
 *
 * Usage:
 *   import { StockHeatmap } from './components/StockHeatmap.js';
 *   const heatmap = new StockHeatmap(document.getElementById('stock-heatmap'), {
 *     theme: 'dark',
 *     exchange: 'US',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class StockHeatmap {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='500']
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   * @param {string} [options.exchanges=''] - Exchange filter
   * @param {string} [options.dataSource='SPX500'] - Data source: 'SPX500', 'NASDAQ100', etc.
   * @param {string} [options.grouping='sector'] - Grouping: 'sector', 'industry', 'no_group'
   * @param {string} [options.blockSize='market_cap_basic'] - Block size metric
   * @param {string} [options.blockColor='change'] - Block color metric
   * @param {boolean} [options.hasTopBar=true]
   * @param {boolean} [options.symbolUrl='']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-stock-heatmap");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "500",
      isTransparent: false,
      locale: "en",
      exchanges: "",
      dataSource: "SPX500",
      grouping: "sector",
      blockSize: "market_cap_basic",
      blockColor: "change",
      hasTopBar: true,
      symbolUrl: "",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      exchanges: this.options.exchanges,
      dataSource: this.options.dataSource,
      grouping: this.options.grouping,
      blockSize: this.options.blockSize,
      blockColor: this.options.blockColor,
      locale: this.options.locale,
      symbolUrl: this.options.symbolUrl,
      colorTheme: this.options.theme,
      hasTopBar: this.options.hasTopBar,
      isDataSet498Enabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: this.options.width,
      height: this.options.height,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "stock-heatmap", this.getConfig());
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default StockHeatmap;
