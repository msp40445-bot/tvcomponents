/**
 * TradingView Ticker Tape Component
 *
 * Displays a scrolling ticker tape of market symbols with live prices.
 *
 * Usage:
 *   import { TickerTape } from './components/TickerTape.js';
 *   const tape = new TickerTape(document.getElementById('ticker'), {
 *     theme: 'dark',
 *     symbols: [
 *       { proName: 'FX:GBPUSD', title: 'GBP/USD' },
 *       { proName: 'NASDAQ:AAPL', title: 'Apple' },
 *     ],
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME, DEFAULT_SYMBOLS } from "../utils/config.js";

export class TickerTape {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {boolean} [options.showSymbolLogo=true]
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.displayMode='adaptive'] - 'adaptive', 'regular', or 'compact'
   * @param {string} [options.locale='en']
   * @param {Array} [options.symbols] - Array of { proName, title }
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-ticker");
    this.options = {
      theme: THEME.DARK,
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
      symbols: null,
      ...options,
    };
    if (!this.options.symbols) {
      this.options.symbols = this.getDefaultSymbols();
    }
    this.render();
  }

  getDefaultSymbols() {
    const allSymbols = [
      ...DEFAULT_SYMBOLS.indices,
      ...DEFAULT_SYMBOLS.forex,
      ...DEFAULT_SYMBOLS.stocks.slice(0, 4),
      ...DEFAULT_SYMBOLS.crypto.slice(0, 2),
    ];
    return allSymbols.map((s) => ({
      proName: s.symbol,
      title: s.label,
    }));
  }

  getConfig() {
    return {
      symbols: this.options.symbols,
      showSymbolLogo: this.options.showSymbolLogo,
      isTransparent: this.options.isTransparent,
      displayMode: this.options.displayMode,
      colorTheme: this.options.theme,
      locale: this.options.locale,
    };
  }

  render() {
    embedWidget(this.container, "ticker-tape", this.getConfig());
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default TickerTape;
