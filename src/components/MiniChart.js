/**
 * TradingView Mini Chart Component
 *
 * A compact chart widget showing a symbol's price history
 * in a small, embeddable format.
 *
 * Usage:
 *   import { MiniChart } from './components/MiniChart.js';
 *   const mini = new MiniChart(document.getElementById('mini-chart'), {
 *     symbol: 'FX:GBPUSD',
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class MiniChart {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.symbol='FX:GBPUSD']
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='300']
   * @param {string} [options.dateRange='12M'] - '1D', '1M', '3M', '12M', '60M', 'ALL'
   * @param {boolean} [options.isTransparent=false]
   * @param {boolean} [options.autosize=true]
   * @param {string} [options.locale='en']
   * @param {string} [options.trendLineColor='rgba(41, 98, 255, 1)']
   * @param {string} [options.underLineColor='rgba(41, 98, 255, 0.3)']
   * @param {string} [options.underLineBottomColor='rgba(41, 98, 255, 0)']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-mini");
    this.options = {
      symbol: "FX:GBPUSD",
      theme: THEME.DARK,
      width: "100%",
      height: "300",
      dateRange: "12M",
      isTransparent: false,
      autosize: true,
      locale: "en",
      trendLineColor: "rgba(41, 98, 255, 1)",
      underLineColor: "rgba(41, 98, 255, 0.3)",
      underLineBottomColor: "rgba(41, 98, 255, 0)",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      symbol: this.options.symbol,
      width: this.options.width,
      height: this.options.height,
      dateRange: this.options.dateRange,
      colorTheme: this.options.theme,
      isTransparent: this.options.isTransparent,
      autosize: this.options.autosize,
      locale: this.options.locale,
      trendLineColor: this.options.trendLineColor,
      underLineColor: this.options.underLineColor,
      underLineBottomColor: this.options.underLineBottomColor,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "mini-symbol-overview", this.getConfig());
  }

  setSymbol(symbol) {
    this.options.symbol = symbol;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default MiniChart;
