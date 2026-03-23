/**
 * TradingView Timeline Component
 *
 * Displays a news timeline with recent market news, analysis,
 * and updates related to a specific symbol or market.
 *
 * Usage:
 *   import { Timeline } from './components/Timeline.js';
 *   const timeline = new Timeline(document.getElementById('timeline'), {
 *     theme: 'dark',
 *     feedMode: 'all_symbols',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class Timeline {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='600']
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   * @param {string} [options.feedMode='all_symbols'] - 'all_symbols', 'symbol', or 'market'
   * @param {string} [options.symbol] - Symbol for 'symbol' feedMode
   * @param {string} [options.market='forex'] - Market for 'market' feedMode
   * @param {string} [options.displayMode='regular'] - 'regular', 'compact', or 'adaptive'
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-timeline");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "600",
      isTransparent: false,
      locale: "en",
      feedMode: "all_symbols",
      market: "forex",
      displayMode: "regular",
      ...options,
    };
    this.render();
  }

  getConfig() {
    const config = {
      feedMode: this.options.feedMode,
      colorTheme: this.options.theme,
      isTransparent: this.options.isTransparent,
      displayMode: this.options.displayMode,
      width: this.options.width,
      height: this.options.height,
      locale: this.options.locale,
    };

    if (this.options.feedMode === "market") {
      config.market = this.options.market;
    }
    if (this.options.feedMode === "symbol" && this.options.symbol) {
      config.symbol = this.options.symbol;
    }

    return config;
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "timeline", this.getConfig());
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default Timeline;
