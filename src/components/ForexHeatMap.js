/**
 * TradingView Forex Heat Map Component
 *
 * Displays a visual heat map of forex currency strength
 * with color-coded cells showing relative performance.
 *
 * Usage:
 *   import { ForexHeatMap } from './components/ForexHeatMap.js';
 *   const heatmap = new ForexHeatMap(document.getElementById('heatmap'), {
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class ForexHeatMap {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='500']
   * @param {boolean} [options.isTransparent=false]
   * @param {string[]} [options.currencies] - Array of currency codes
   * @param {string} [options.locale='en']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-forex-heatmap");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "500",
      isTransparent: false,
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"],
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
    embedWidget(this.container, "forex-heat-map", this.getConfig());
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default ForexHeatMap;
