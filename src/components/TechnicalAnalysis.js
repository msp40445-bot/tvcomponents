/**
 * TradingView Technical Analysis Component
 *
 * Displays the technical analysis gauge showing Buy/Sell/Neutral signals
 * with oscillators, moving averages, and summary indicators.
 *
 * Usage:
 *   import { TechnicalAnalysis } from './components/TechnicalAnalysis.js';
 *   const ta = new TechnicalAnalysis(document.getElementById('ta-container'), {
 *     symbol: 'FX:GBPUSD',
 *     interval: '1D',
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class TechnicalAnalysis {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.symbol='FX:GBPUSD'] - Trading symbol
   * @param {string} [options.interval='1D'] - Analysis interval (1m, 5m, 15m, 30m, 1h, 2h, 4h, 1D, 1W, 1M)
   * @param {string} [options.theme='dark'] - Color theme
   * @param {string} [options.width='100%']
   * @param {string} [options.height='500']
   * @param {boolean} [options.isTransparent=false]
   * @param {boolean} [options.showIntervalTabs=true]
   * @param {string} [options.locale='en']
   * @param {string} [options.displayMode='single'] - 'single' or 'multiple'
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-ta");
    this.options = {
      symbol: "FX:GBPUSD",
      interval: "1D",
      theme: THEME.DARK,
      width: "100%",
      height: "500",
      isTransparent: false,
      showIntervalTabs: true,
      locale: "en",
      displayMode: "single",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      interval: this.options.interval,
      width: this.options.width,
      isTransparent: this.options.isTransparent,
      height: this.options.height,
      symbol: this.options.symbol,
      showIntervalTabs: this.options.showIntervalTabs,
      displayMode: this.options.displayMode,
      locale: this.options.locale,
      colorTheme: this.options.theme,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "technical-analysis", this.getConfig());
  }

  /**
   * Change the symbol.
   */
  setSymbol(symbol) {
    this.options.symbol = symbol;
    this.render();
  }

  /**
   * Change the analysis interval.
   */
  setInterval(interval) {
    this.options.interval = interval;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default TechnicalAnalysis;
