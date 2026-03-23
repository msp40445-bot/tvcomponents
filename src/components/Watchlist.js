/**
 * TradingView Market Quotes / Watchlist Component
 *
 * Displays a watchlist with real-time quotes for multiple symbols,
 * grouped by category (Indices, Stocks, Forex, Crypto, etc.)
 *
 * Usage:
 *   import { Watchlist } from './components/Watchlist.js';
 *   const watchlist = new Watchlist(document.getElementById('watchlist'), {
 *     theme: 'dark',
 *     groups: [
 *       { name: 'Indices', symbols: [{ name: 'SP:SPX' }, { name: 'NASDAQ:NDX' }] },
 *       { name: 'Forex', symbols: [{ name: 'FX:GBPUSD' }, { name: 'FX:EURUSD' }] },
 *     ],
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME, DEFAULT_SYMBOLS } from "../utils/config.js";

export class Watchlist {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='600']
   * @param {boolean} [options.showSymbolLogo=true]
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   * @param {Array} [options.groups] - Array of { name, symbols: [{ name }] }
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-watchlist");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "600",
      showSymbolLogo: true,
      isTransparent: false,
      locale: "en",
      groups: null,
      ...options,
    };
    if (!this.options.groups) {
      this.options.groups = this.getDefaultGroups();
    }
    this.render();
  }

  getDefaultGroups() {
    return [
      {
        name: "Indices",
        originalName: "Indices",
        symbols: DEFAULT_SYMBOLS.indices.map((s) => ({
          name: s.symbol,
          displayName: s.label,
        })),
      },
      {
        name: "Stocks",
        originalName: "Stocks",
        symbols: DEFAULT_SYMBOLS.stocks.map((s) => ({
          name: s.symbol,
          displayName: s.label,
        })),
      },
      {
        name: "Forex",
        originalName: "Forex",
        symbols: DEFAULT_SYMBOLS.forex.map((s) => ({
          name: s.symbol,
          displayName: s.label,
        })),
      },
      {
        name: "Crypto",
        originalName: "Crypto",
        symbols: DEFAULT_SYMBOLS.crypto.map((s) => ({
          name: s.symbol,
          displayName: s.label,
        })),
      },
    ];
  }

  getConfig() {
    return {
      width: this.options.width,
      height: this.options.height,
      symbolsGroups: this.options.groups,
      showSymbolLogo: this.options.showSymbolLogo,
      isTransparent: this.options.isTransparent,
      colorTheme: this.options.theme,
      locale: this.options.locale,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "market-quotes", this.getConfig());
  }

  /**
   * Update the watchlist groups.
   * @param {Array} groups
   */
  setGroups(groups) {
    this.options.groups = groups;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default Watchlist;
