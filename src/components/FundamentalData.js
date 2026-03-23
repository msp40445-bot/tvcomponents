/**
 * TradingView Fundamental Data Component
 *
 * Displays fundamental financial data for a given stock symbol,
 * including key metrics, valuation ratios, dividends, and more.
 *
 * Usage:
 *   import { FundamentalData } from './components/FundamentalData.js';
 *   const data = new FundamentalData(document.getElementById('fundamentals'), {
 *     symbol: 'NASDAQ:AAPL',
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class FundamentalData {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.symbol='NASDAQ:AAPL']
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='500']
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   * @param {string} [options.displayMode='regular'] - 'regular' or 'compact'
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-fundamental");
    this.options = {
      symbol: "NASDAQ:AAPL",
      theme: THEME.DARK,
      width: "100%",
      height: "500",
      isTransparent: false,
      locale: "en",
      displayMode: "regular",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      symbol: this.options.symbol,
      colorTheme: this.options.theme,
      isTransparent: this.options.isTransparent,
      width: this.options.width,
      height: this.options.height,
      locale: this.options.locale,
      displayMode: this.options.displayMode,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "financials", this.getConfig());
  }

  setSymbol(symbol) {
    this.options.symbol = symbol;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default FundamentalData;
