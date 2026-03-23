/**
 * TradingView Forex Cross Rates Component
 *
 * Displays a matrix of forex cross rates showing exchange rates
 * between multiple currency pairs.
 *
 * Usage:
 *   import { ForexCrossRates } from './components/ForexCrossRates.js';
 *   const rates = new ForexCrossRates(document.getElementById('cross-rates'), {
 *     theme: 'dark',
 *     currencies: ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD'],
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class ForexCrossRates {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='400']
   * @param {boolean} [options.isTransparent=false]
   * @param {string[]} [options.currencies] - Array of currency codes
   * @param {string} [options.locale='en']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-forex-cross");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "400",
      isTransparent: false,
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      locale: "en",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      width: this.options.width,
      height: this.options.height,
      currencies: this.options.currencies,
      isTransparent: this.options.isTransparent,
      colorTheme: this.options.theme,
      locale: this.options.locale,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "forex-cross-rates", this.getConfig());
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default ForexCrossRates;
