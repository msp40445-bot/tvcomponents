/**
 * TradingView Crypto Market Component
 *
 * Displays cryptocurrency market data with prices, market caps,
 * volumes, and performance metrics.
 *
 * Usage:
 *   import { CryptoMarket } from './components/CryptoMarket.js';
 *   const crypto = new CryptoMarket(document.getElementById('crypto'), {
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class CryptoMarket {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='500']
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   * @param {string} [options.defaultColumn='overview']
   * @param {string} [options.screenerType='crypto_mkt']
   * @param {string} [options.displayCurrency='USD']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-crypto");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "500",
      isTransparent: false,
      locale: "en",
      defaultColumn: "overview",
      screenerType: "crypto_mkt",
      displayCurrency: "USD",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      width: this.options.width,
      height: this.options.height,
      defaultColumn: this.options.defaultColumn,
      screener_type: this.options.screenerType,
      displayCurrency: this.options.displayCurrency,
      colorTheme: this.options.theme,
      locale: this.options.locale,
      isTransparent: this.options.isTransparent,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "crypto-coins-heatmap", this.getConfig());
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default CryptoMarket;
