/**
 * TradingView Economic Calendar Component
 *
 * Displays upcoming economic events, news releases, earnings,
 * and other market-moving events.
 *
 * Usage:
 *   import { EconomicCalendar } from './components/EconomicCalendar.js';
 *   const calendar = new EconomicCalendar(document.getElementById('calendar'), {
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class EconomicCalendar {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='500']
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   * @param {string} [options.importanceFilter='-1,0,1'] - Filter by importance
   * @param {string[]} [options.countryFilter] - Filter by country codes
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-calendar");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "500",
      isTransparent: false,
      locale: "en",
      importanceFilter: "-1,0,1",
      countryFilter: [],
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      width: this.options.width,
      height: this.options.height,
      colorTheme: this.options.theme,
      isTransparent: this.options.isTransparent,
      locale: this.options.locale,
      importanceFilter: this.options.importanceFilter,
      countryFilter: this.options.countryFilter.join(","),
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "events", this.getConfig());
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default EconomicCalendar;
