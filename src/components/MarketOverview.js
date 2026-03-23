/**
 * TradingView Market Overview Component
 *
 * Displays a comprehensive market overview with tabs for different
 * market categories, showing prices, changes, and mini charts.
 *
 * Usage:
 *   import { MarketOverview } from './components/MarketOverview.js';
 *   const overview = new MarketOverview(document.getElementById('market-overview'), {
 *     theme: 'dark',
 *   });
 */

import { embedWidget, generateId } from "../utils/widgetLoader.js";
import { THEME } from "../utils/config.js";

export class MarketOverview {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {string} [options.theme='dark']
   * @param {string} [options.width='100%']
   * @param {string} [options.height='600']
   * @param {boolean} [options.isTransparent=false]
   * @param {boolean} [options.showSymbolLogo=true]
   * @param {boolean} [options.showFloatingTooltip=false]
   * @param {string} [options.locale='en']
   * @param {string} [options.plotLineColorGrowing='rgba(41, 98, 255, 1)']
   * @param {string} [options.plotLineColorFalling='rgba(41, 98, 255, 1)']
   * @param {Array} [options.tabs] - Custom tabs configuration
   */
  constructor(container, options = {}) {
    this.container = container;
    this.id = generateId("tv-overview");
    this.options = {
      theme: THEME.DARK,
      width: "100%",
      height: "600",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      locale: "en",
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(42, 46, 57, 0)",
      scaleFontColor: "rgba(209, 212, 220, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: null,
      ...options,
    };
    if (!this.options.tabs) {
      this.options.tabs = this.getDefaultTabs();
    }
    this.render();
  }

  getDefaultTabs() {
    return [
      {
        title: "Indices",
        symbols: [
          { s: "FOREXCOM:SPXUSD", d: "S&P 500 Index" },
          { s: "FOREXCOM:NSXUSD", d: "US 100 Cash CFD" },
          { s: "FOREXCOM:DJI", d: "Dow Jones Industrial Average Index" },
          { s: "INDEX:NKY", d: "Nikkei 225" },
          { s: "INDEX:DEU40", d: "DAX Index" },
          { s: "FOREXCOM:UKXGBP", d: "FTSE 100 Index" },
        ],
        originalTitle: "Indices",
      },
      {
        title: "Futures",
        symbols: [
          { s: "CME_MINI:ES1!", d: "S&P 500" },
          { s: "CME:6E1!", d: "Euro" },
          { s: "COMEX:GC1!", d: "Gold" },
          { s: "NYMEX:CL1!", d: "WTI Crude Oil" },
          { s: "NYMEX:NG1!", d: "Gas" },
          { s: "CBOT:ZC1!", d: "Corn" },
        ],
        originalTitle: "Futures",
      },
      {
        title: "Bonds",
        symbols: [
          { s: "CBOT:ZB1!", d: "T-Bond" },
          { s: "CBOT:UB1!", d: "Ultra T-Bond" },
          { s: "EUREX:FGBL1!", d: "Euro Bund" },
          { s: "EUREX:FBTP1!", d: "Euro BTP" },
          { s: "EUREX:FGBM1!", d: "Euro BOBL" },
        ],
        originalTitle: "Bonds",
      },
      {
        title: "Forex",
        symbols: [
          { s: "FX:EURUSD", d: "EUR to USD" },
          { s: "FX:GBPUSD", d: "GBP to USD" },
          { s: "FX:USDJPY", d: "USD to JPY" },
          { s: "FX:USDCHF", d: "USD to CHF" },
          { s: "FX:AUDUSD", d: "AUD to USD" },
          { s: "FX:USDCAD", d: "USD to CAD" },
        ],
        originalTitle: "Forex",
      },
    ];
  }

  getConfig() {
    return {
      colorTheme: this.options.theme,
      dateRange: "12M",
      showChart: true,
      locale: this.options.locale,
      width: this.options.width,
      height: this.options.height,
      largeChartUrl: "",
      isTransparent: this.options.isTransparent,
      showSymbolLogo: this.options.showSymbolLogo,
      showFloatingTooltip: this.options.showFloatingTooltip,
      plotLineColorGrowing: this.options.plotLineColorGrowing,
      plotLineColorFalling: this.options.plotLineColorFalling,
      gridLineColor: this.options.gridLineColor,
      scaleFontColor: this.options.scaleFontColor,
      belowLineFillColorGrowing: this.options.belowLineFillColorGrowing,
      belowLineFillColorFalling: this.options.belowLineFillColorFalling,
      belowLineFillColorGrowingBottom: this.options.belowLineFillColorGrowingBottom,
      belowLineFillColorFallingBottom: this.options.belowLineFillColorFallingBottom,
      symbolActiveColor: this.options.symbolActiveColor,
      tabs: this.options.tabs,
    };
  }

  render() {
    this.container.style.height = `${this.options.height}px`;
    embedWidget(this.container, "market-overview", this.getConfig());
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

export default MarketOverview;
