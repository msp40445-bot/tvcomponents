/**
 * TradingView Stock Market / Hotlists Component
 *
 * Displays stock market hotlists showing top gainers, losers,
 * and most active stocks with real-time data.
 *
 * Usage:
 *   import { StockMarket } from './components/StockMarket.js';
 *   const stocks = new StockMarket(document.getElementById('stocks'), {
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class StockMarket {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='600']
   * @param {boolean} [options.isTransparent=false]
   * @param {string} [options.locale='en']
   * @param {string} [options.exchange='US'] - Exchange: 'US', 'NASDAQ', 'NYSE', 'LSE', etc.
   * @param {boolean} [options.showSymbolLogo=true]
   * @param {boolean} [options.showChart=true]
   * @param {string} [options.dateRange='12M']
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-stock-market");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "600",
      isTransparent: false,
      locale: "en",
      exchange: "US",
      showSymbolLogo: true,
      showChart: true,
      dateRange: "12M",
      ...options,
    };
    this.render();
  }

  getConfig() {
    return {
      colorTheme: this.options.theme,
      dateRange: this.options.dateRange,
      exchange: this.options.exchange,
      showChart: this.options.showChart,
      locale: this.options.locale,
      width: this.options.width,
      height: this.options.height,
      showSymbolLogo: this.options.showSymbolLogo,
      isTransparent: this.options.isTransparent,
      largeChartUrl: "",
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(42, 46, 57, 0)",
      scaleFontColor: "rgba(209, 212, 220, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "hotlists", this.getConfig());
  }

  setExchange(exchange) {
    this.options.exchange = exchange;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default StockMarket;
