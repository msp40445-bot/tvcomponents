/**
 * TradingView Company Profile / Financials Component
 *
 * Displays detailed company financial data including revenue,
 * earnings, balance sheet, and key financial ratios.
 *
 * Usage:
 *   import { CompanyProfile } from './components/CompanyProfile.js';
 *   const profile = new CompanyProfile(document.getElementById('profile'), {
 *     symbol: 'NASDAQ:AAPL',
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class CompanyProfile {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.symbol='NASDAQ:AAPL']
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='500']
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-company-profile");
    this.options = {
      symbol: "NASDAQ:AAPL",
      theme: THEME.DARK,
      width: "100%",
      height: "500",
      isTransparent: false,
      locale: "en",
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
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "symbol-profile", this.getConfig());
  }

  setSymbol(symbol) {
    this.options.symbol = symbol;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default CompanyProfile;
