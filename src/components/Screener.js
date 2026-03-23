/**
 * TradingView Screener Component
 *
 * Displays a stock/forex/crypto screener with filtering,
 * sorting, and real-time data.
 *
 * Usage:
 *   import { Screener } from './components/Screener.js';
 *   const screener = new Screener(document.getElementById('screener'), {
 *     theme: 'dark',
 *     market: 'forex',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class Screener {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='600']
   * @param {string} [options.market='forex'] - 'forex', 'america', 'uk', 'crypto', 'cfd', etc.
   * @param {boolean} [options.showToolbar=true]
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.defaultColumn='overview'] - 'overview', 'performance', 'oscillators', 'moving_averages'
   * @param {string} [options.defaultScreen='general'] - Default screen filter
   * @param {string} [options.locale='en']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-screener");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "600",
      market: "forex",
      showToolbar: true,
      isTransparent: false,
      defaultColumn: "overview",
      defaultScreen: "general",
      locale: "en",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      width: this.options.width,
      height: this.options.height,
      defaultColumn: this.options.defaultColumn,
      defaultScreen: this.options.defaultScreen,
      market: this.options.market,
      showToolbar: this.options.showToolbar,
      colorTheme: this.options.theme,
      locale: this.options.locale,
      isTransparent: this.options.isTransparent,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "screener", this.getConfig());
  }

  /**
   * Change the market being screened.
   * @param {string} market
   */
  setMarket(market) {
    this.options.market = market;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default Screener;
