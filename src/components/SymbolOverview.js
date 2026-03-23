/**
 * TradingView Symbol Overview Component
 *
 * Displays a compact overview of a symbol with a price chart,
 * current price, change, and key statistics.
 *
 * Usage:
 *   import { SymbolOverview } from './components/SymbolOverview.js';
 *   const overview = new SymbolOverview(document.getElementById('overview'), {
 *     symbols: [['Apple', 'AAPL|1D'], ['Google', 'GOOGL|1D']],
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class SymbolOverview {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='400']
   * @param {Array} [options.symbols] - Array of [label, "SYMBOL|INTERVAL"] pairs
   * @param {string} [options.chartType='area'] - 'area' or 'candlesticks'
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   * @param {boolean} [options.showVolume=false]
   * @param {boolean} [options.showMA=false]
   * @param {number} [options.maLength=14]
   * @param {string} [options.maType='SMA']
   * @param {string} [options.gridLineColor='rgba(42, 46, 57, 0)']
   * @param {number} [options.fontsize=16]
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-symbol-overview");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "400",
      symbols: [
        ["GBP/USD", "FX:GBPUSD|1D"],
        ["EUR/USD", "FX:EURUSD|1D"],
        ["Gold", "OANDA:XAUUSD|1D"],
        ["Bitcoin", "BINANCE:BTCUSDT|1D"],
      ],
      chartType: "area",
      isTransparent: false,
      locale: "en",
      showVolume: false,
      showMA: false,
      maLength: 14,
      maType: "SMA",
      gridLineColor: "rgba(42, 46, 57, 0)",
      fontsize: 16,
      lineWidth: 2,
      lineType: 0,
      dateRanges: [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M",
      ],
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      symbols: this.options.symbols,
      chartOnly: false,
      width: this.options.width,
      height: this.options.height,
      locale: this.options.locale,
      colorTheme: this.options.theme,
      autosize: this.options.width === "100%",
      showVolume: this.options.showVolume,
      showMA: this.options.showMA,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      fontSize: String(this.options.fontsize),
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      chartType: this.options.chartType,
      maLength: this.options.maLength,
      maType: this.options.maType,
      lineWidth: this.options.lineWidth,
      lineType: this.options.lineType,
      dateRanges: this.options.dateRanges,
      gridLineColor: this.options.gridLineColor,
      isTransparent: this.options.isTransparent,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "symbol-overview", this.getConfig());
  }

  setSymbols(symbols) {
    this.options.symbols = symbols;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default SymbolOverview;
