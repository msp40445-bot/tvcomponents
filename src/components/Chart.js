/**
 * TradingView Advanced Chart Component
 *
 * Renders a full-featured interactive chart with candlesticks, indicators,
 * drawing tools, and real-time data.
 *
 * Usage:
 *   import { Chart } from './components/Chart.js';
 *   const chart = new Chart(document.getElementById('chart-container'), {
 *     symbol: 'FX:GBPUSD',
 *     interval: 'D',
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME, INTERVALS } from "../utils/config.js";

export class Chart {
  /**
   * @param {HTMLElement} container - DOM element to render the chart into
   * @param {object} options - Chart configuration
   * @param {string} options.symbol - Trading symbol (e.g., 'FX:GBPUSD', 'NASDAQ:AAPL')
   * @param {string} [options.interval='D'] - Time interval (1, 5, 15, 30, 60, 120, 240, D, W, M)
   * @param {string} [options.theme='dark'] - Color theme ('light' or 'dark')
   * @param {string} [options.width='100%'] - Width
   * @param {string} [options.height='600'] - Height in pixels
   * @param {number} [options.style=1] - Chart style (1=Candles, 2=Line, 3=Area, etc.)
   * @param {boolean} [options.allowSymbolChange=true] - Allow changing the symbol
   * @param {boolean} [options.showDrawingToolbar=true] - Show drawing tools
   * @param {boolean} [options.showIndicators=true] - Show indicators button
   * @param {boolean} [options.showDetails=true] - Show symbol details
   * @param {boolean} [options.showHotlist=false] - Show hotlist
   * @param {boolean} [options.showCalendar=false] - Show calendar
   * @param {string[]} [options.studies] - Array of indicator study IDs to add
   * @param {string} [options.timezone='Etc/UTC'] - Timezone
   * @param {string} [options.locale='en'] - Locale
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-chart");
    this.options = {
      symbol: "FX:GBPUSD",
      interval: "D",
      theme: THEME.DARK,
      width: "100%",
      height: "600",
      style: 1,
      allowSymbolChange: true,
      showDrawingToolbar: true,
      showIndicators: true,
      showDetails: true,
      showHotlist: false,
      showCalendar: false,
      studies: [],
      timezone: "Etc/UTC",
      locale: "en",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      autosize: this.options.width === "100%",
      symbol: this.options.symbol,
      interval: this.options.interval,
      timezone: this.options.timezone,
      theme: this.options.theme,
      style: String(this.options.style),
      locale: this.options.locale,
      allow_symbol_change: this.options.allowSymbolChange,
      calendar: this.options.showCalendar,
      studies: this.options.studies,
      support_host: "https://www.tradingview.com",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: true,
      hide_volume: false,
      details: this.options.showDetails,
      hotlist: this.options.showHotlist,
      withdateranges: true,
      enable_publishing: false,
      container_id: this.id,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    this.container.id = this.id;
    this.container.className = "tradingview-widget-container";

    embedWidget(this.container, "advanced-chart", this.getConfig());
  }

  /**
   * Update the symbol displayed on the chart.
   * @param {string} symbol
   */
  setSymbol(symbol) {
    this.options.symbol = symbol;
    this.render();
  }

  /**
   * Update the time interval.
   * @param {string} interval
   */
  setInterval(interval) {
    this.options.interval = interval;
    this.render();
  }

  /**
   * Update the theme.
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    this.options.theme = theme;
    this.render();
  }

  /**
   * Destroy the widget and clean up.
   */
  destroy() {
    this.container.innerHTML = "";
  }
}

export default Chart;
