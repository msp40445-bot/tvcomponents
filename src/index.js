/**
 * TradingView Components Library
 *
 * A collection of reusable TradingView widget components that can be
 * dropped into any web project. Each component wraps an official
 * TradingView embed widget with a clean JavaScript API.
 *
 * Usage:
 *   // Import individual components
 *   import { Chart, Watchlist, TechnicalAnalysis } from './src/index.js';
 *
 *   // Or import everything
 *   import * as TV from './src/index.js';
 *
 *   // Create a chart
 *   const chart = new TV.Chart(document.getElementById('my-chart'), {
 *     symbol: 'FX:GBPUSD',
 *     theme: 'dark',
 *   });
 */

// Components
export { Chart } from "./components/Chart.js";
export { Watchlist } from "./components/Watchlist.js";
export { TechnicalAnalysis } from "./components/TechnicalAnalysis.js";
export { TickerTape } from "./components/TickerTape.js";
export { SymbolInfo } from "./components/SymbolInfo.js";
export { SymbolOverview } from "./components/SymbolOverview.js";
export { MarketOverview } from "./components/MarketOverview.js";
export { Screener } from "./components/Screener.js";
export { MiniChart } from "./components/MiniChart.js";
export { ForexCrossRates } from "./components/ForexCrossRates.js";
export { ForexHeatMap } from "./components/ForexHeatMap.js";
export { CryptoMarket } from "./components/CryptoMarket.js";
export { StockMarket } from "./components/StockMarket.js";
export { StockHeatmap } from "./components/StockHeatmap.js";
export { EconomicCalendar } from "./components/EconomicCalendar.js";
export { Timeline } from "./components/Timeline.js";
export { CompanyProfile } from "./components/CompanyProfile.js";
export { FundamentalData } from "./components/FundamentalData.js";

// Layout
export { DashboardLayout } from "./components/DashboardLayout.js";

// Utilities
export { DEFAULT_SYMBOLS, THEME, INTERVALS, CHART_STYLES, COLOR_THEMES } from "./utils/config.js";
export { loadScript, loadTVLibrary, loadWidgetScript, createWidgetContainer, embedWidget, generateId } from "./utils/widgetLoader.js";

/**
 * Initialize all TV components on a page by scanning for
 * data-tv-component attributes.
 *
 * Example HTML:
 *   <div data-tv-component="Chart" data-tv-symbol="FX:GBPUSD" data-tv-theme="dark"></div>
 *
 * Then call: TV.autoInit();
 */
export function autoInit() {
  const componentMap = {
    Chart: () => import("./components/Chart.js").then((m) => m.Chart),
    Watchlist: () => import("./components/Watchlist.js").then((m) => m.Watchlist),
    TechnicalAnalysis: () => import("./components/TechnicalAnalysis.js").then((m) => m.TechnicalAnalysis),
    TickerTape: () => import("./components/TickerTape.js").then((m) => m.TickerTape),
    SymbolInfo: () => import("./components/SymbolInfo.js").then((m) => m.SymbolInfo),
    SymbolOverview: () => import("./components/SymbolOverview.js").then((m) => m.SymbolOverview),
    MarketOverview: () => import("./components/MarketOverview.js").then((m) => m.MarketOverview),
    Screener: () => import("./components/Screener.js").then((m) => m.Screener),
    MiniChart: () => import("./components/MiniChart.js").then((m) => m.MiniChart),
    ForexCrossRates: () => import("./components/ForexCrossRates.js").then((m) => m.ForexCrossRates),
    ForexHeatMap: () => import("./components/ForexHeatMap.js").then((m) => m.ForexHeatMap),
    CryptoMarket: () => import("./components/CryptoMarket.js").then((m) => m.CryptoMarket),
    StockMarket: () => import("./components/StockMarket.js").then((m) => m.StockMarket),
    StockHeatmap: () => import("./components/StockHeatmap.js").then((m) => m.StockHeatmap),
    EconomicCalendar: () => import("./components/EconomicCalendar.js").then((m) => m.EconomicCalendar),
    Timeline: () => import("./components/Timeline.js").then((m) => m.Timeline),
    CompanyProfile: () => import("./components/CompanyProfile.js").then((m) => m.CompanyProfile),
    FundamentalData: () => import("./components/FundamentalData.js").then((m) => m.FundamentalData),
  };

  const elements = document.querySelectorAll("[data-tv-component]");

  elements.forEach(async (el) => {
    const componentName = el.dataset.tvComponent;
    const loader = componentMap[componentName];

    if (!loader) {
      console.warn(`Unknown TV component: ${componentName}`);
      return;
    }

    // Parse options from data attributes
    const options = {};
    Object.keys(el.dataset).forEach((key) => {
      if (key.startsWith("tv") && key !== "tvComponent") {
        const optionKey = key.charAt(2).toLowerCase() + key.slice(3);
        options[optionKey] = el.dataset[key];
      }
    });

    try {
      const Component = await loader();
      new Component(el, options);
    } catch (err) {
      console.error(`Failed to initialize ${componentName}:`, err);
    }
  });
}
