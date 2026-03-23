/**
 * TradingView Symbol Info Component
 *
 * Displays detailed information about a single trading symbol
 * including price, change, description, and key stats.
 *
 * Usage:
 *   import { SymbolInfo } from './components/SymbolInfo.js';
 *   const info = new SymbolInfo(document.getElementById('symbol-info'), {
 *     symbol: 'NASDAQ:AAPL',
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class SymbolInfo {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.symbol='FX:GBPUSD']
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-symbol-info");
    this.options = {
      symbol: "FX:GBPUSD",
      theme: THEME.DARK,
      width: "100%",
      isTransparent: false,
      locale: "en",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      symbol: this.options.symbol,
      width: this.options.width,
      isTransparent: this.options.isTransparent,
      colorTheme: this.options.theme,
      locale: this.options.locale,
    };
  }

  render() {
    embedWidget(this.container, "symbol-info", this.getConfig());
  }

  setSymbol(symbol) {
    this.options.symbol = symbol;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default SymbolInfo;
