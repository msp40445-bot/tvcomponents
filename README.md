# TradingView Components

A self-contained library of **18 reusable TradingView widget components** that can be dropped into any web project. Each component wraps an official TradingView embed widget with a clean, configurable JavaScript API.

## Components

| Component | Description |
|---|---|
| **Chart** | Full-featured interactive candlestick chart with indicators, drawing tools, and real-time data |
| **TechnicalAnalysis** | Buy/Sell/Neutral gauge with oscillators and moving averages breakdown |
| **Watchlist** | Live market quotes grouped by category (Indices, Stocks, Forex, Crypto) |
| **TickerTape** | Scrolling ticker tape with live symbol prices |
| **SymbolInfo** | Detailed symbol information with price, change, and description |
| **SymbolOverview** | Compact multi-symbol overview with area/candle chart and price tracking |
| **MarketOverview** | Multi-tab overview with mini charts for indices, futures, bonds, forex |
| **MiniChart** | Compact price history chart for quick symbol reference |
| **Screener** | Stock/forex/crypto screener with filters, sorting, and real-time data |
| **ForexCrossRates** | Currency cross rate matrix between major pairs |
| **ForexHeatMap** | Visual heat map of forex currency strength |
| **StockHeatmap** | Interactive S&P 500 / market treemap by sector |
| **CryptoMarket** | Crypto market heatmap with top coins |
| **StockMarket** | Top gainers, losers, most active stocks |
| **EconomicCalendar** | Upcoming economic events, earnings, and announcements |
| **Timeline** | Market news, analysis, and trading ideas feed |
| **CompanyProfile** | Detailed company information, sector, and key data |
| **FundamentalData** | Financial metrics, valuation ratios, and statements |

---

## Quick Start

### 1. Copy the folder

Copy the entire `tvcomponents/` folder into your project:

```
your-project/
├── tvcomponents/        <-- copy this folder
│   ├── src/
│   │   ├── index.js
│   │   ├── components/
│   │   ├── styles/
│   │   └── utils/
│   ├── demo/
│   └── package.json
├── your-app/
└── ...
```

### 2. Import and use

```html
<div id="my-chart" style="height: 600px;"></div>

<script type="module">
  import { Chart } from './tvcomponents/src/index.js';

  const chart = new Chart(document.getElementById('my-chart'), {
    symbol: 'FX:GBPUSD',
    interval: 'D',
    theme: 'dark',
    height: '600',
  });
</script>
```

### 3. Run the demo

```bash
cd tvcomponents
npx serve . -p 3000
# Open http://localhost:3000/demo/
```

---

## Integration Guide

### Plain HTML / Vanilla JS

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="tvcomponents/src/styles/components.css" />
</head>
<body>
  <div id="chart" style="height:600px;"></div>
  <div id="watchlist" style="height:500px;"></div>

  <script type="module">
    import { Chart, Watchlist } from './tvcomponents/src/index.js';

    new Chart(document.getElementById('chart'), {
      symbol: 'FX:GBPUSD',
      theme: 'dark',
    });

    new Watchlist(document.getElementById('watchlist'), {
      theme: 'dark',
    });
  </script>
</body>
</html>
```

### React

```jsx
import { useEffect, useRef } from 'react';
import { Chart } from '../tvcomponents/src/components/Chart.js';

export function TVChart({ symbol = 'FX:GBPUSD', theme = 'dark' }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      chartRef.current = new Chart(containerRef.current, { symbol, theme, height: '500' });
    }
    return () => chartRef.current?.destroy();
  }, [symbol, theme]);

  return <div ref={containerRef} style={{ height: '500px' }} />;
}

// Usage: <TVChart symbol="NASDAQ:AAPL" theme="dark" />
```

### Vue

```vue
<template>
  <div ref="chartContainer" style="height: 500px;"></div>
</template>

<script>
import { Chart } from '../tvcomponents/src/components/Chart.js';

export default {
  props: {
    symbol: { type: String, default: 'FX:GBPUSD' },
    theme: { type: String, default: 'dark' },
  },
  mounted() {
    this.chart = new Chart(this.$refs.chartContainer, {
      symbol: this.symbol,
      theme: this.theme,
      height: '500',
    });
  },
  beforeUnmount() {
    this.chart?.destroy();
  },
};
</script>
```

### Angular

```typescript
import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Chart } from '../tvcomponents/src/components/Chart.js';

@Component({
  selector: 'app-tv-chart',
  template: '<div #chartContainer style="height: 500px;"></div>',
})
export class TVChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) container!: ElementRef;
  private chart?: Chart;

  ngOnInit() {
    this.chart = new Chart(this.container.nativeElement, {
      symbol: 'FX:GBPUSD',
      theme: 'dark',
      height: '500',
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}
```

### Next.js (Client Component)

```jsx
'use client';
import { useEffect, useRef } from 'react';

export default function TVChart({ symbol = 'FX:GBPUSD' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let chart;
    import('../tvcomponents/src/components/Chart.js').then(({ Chart }) => {
      if (containerRef.current) {
        chart = new Chart(containerRef.current, { symbol, theme: 'dark', height: '500' });
      }
    });
    return () => chart?.destroy();
  }, [symbol]);

  return <div ref={containerRef} style={{ height: '500px' }} />;
}
```

---

## Auto-Init (Data Attributes)

You can declaratively add components using `data-tv-*` attributes:

```html
<div
  data-tv-component="Chart"
  data-tv-symbol="FX:GBPUSD"
  data-tv-theme="dark"
  data-tv-interval="D"
  style="height: 600px;"
></div>

<div
  data-tv-component="TechnicalAnalysis"
  data-tv-symbol="FX:GBPUSD"
  data-tv-theme="dark"
  style="height: 500px;"
></div>

<script type="module">
  import { autoInit } from './tvcomponents/src/index.js';
  autoInit();
</script>
```

---

## Component API Reference

### Chart

```js
const chart = new Chart(container, {
  symbol: 'FX:GBPUSD',       // Trading symbol
  interval: 'D',              // 1, 5, 15, 30, 60, 120, 240, D, W, M
  theme: 'dark',              // 'light' or 'dark'
  height: '600',              // Height in pixels
  style: 1,                   // 0=Bars, 1=Candles, 2=Line, 3=Area
  allowSymbolChange: true,    // Allow symbol change from chart
  showDrawingToolbar: true,   // Drawing tools sidebar
  showDetails: true,          // OHLC details bar
  studies: [],                // Array of indicator IDs
  timezone: 'Etc/UTC',
  locale: 'en',
});

chart.setSymbol('NASDAQ:AAPL');
chart.setInterval('60');
chart.setTheme('light');
chart.destroy();
```

### TechnicalAnalysis

```js
const ta = new TechnicalAnalysis(container, {
  symbol: 'FX:GBPUSD',
  interval: '1D',            // 1m, 5m, 15m, 30m, 1h, 2h, 4h, 1D, 1W, 1M
  theme: 'dark',
  height: '500',
  showIntervalTabs: true,    // Show interval selector tabs
  displayMode: 'single',    // 'single' or 'multiple'
});

ta.setSymbol('OANDA:XAUUSD');
ta.setInterval('1h');
```

### Watchlist

```js
const watchlist = new Watchlist(container, {
  theme: 'dark',
  height: '600',
  showSymbolLogo: true,
  groups: [                   // Custom symbol groups
    {
      name: 'My Forex',
      originalName: 'My Forex',
      symbols: [
        { name: 'FX:GBPUSD', displayName: 'GBP/USD' },
        { name: 'FX:EURUSD', displayName: 'EUR/USD' },
      ],
    },
  ],
});
```

### Screener

```js
const screener = new Screener(container, {
  theme: 'dark',
  height: '600',
  market: 'forex',            // 'forex', 'america', 'uk', 'crypto', 'cfd'
  defaultColumn: 'overview',  // 'overview', 'performance', 'oscillators', 'moving_averages'
  showToolbar: true,
});

screener.setMarket('crypto');
```

### MiniChart

```js
new MiniChart(container, {
  symbol: 'FX:GBPUSD',
  theme: 'dark',
  height: '220',
  dateRange: '12M',           // '1D', '1M', '3M', '12M', '60M', 'ALL'
});
```

### ForexCrossRates

```js
new ForexCrossRates(container, {
  theme: 'dark',
  height: '400',
  currencies: ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD'],
});
```

### EconomicCalendar

```js
new EconomicCalendar(container, {
  theme: 'dark',
  height: '500',
  importanceFilter: '-1,0,1',  // Filter by event importance
  countryFilter: ['US', 'GB'], // Filter by country
});
```

### StockHeatmap

```js
new StockHeatmap(container, {
  theme: 'dark',
  height: '500',
  dataSource: 'SPX500',       // 'SPX500', 'NASDAQ100', etc.
  grouping: 'sector',         // 'sector', 'industry', 'no_group'
  blockSize: 'market_cap_basic',
  blockColor: 'change',
});
```

---

## Available Symbols

### Forex
- `FX:GBPUSD`, `FX:EURUSD`, `FX:USDJPY`, `FX:AUDUSD`, `FX:USDCAD`, `FX:USDCHF`
- `OANDA:XAUUSD` (Gold), `OANDA:XAGUSD` (Silver)
- `PEPPERSTONE:XAUUSD`, `FPMARKETS:GBPUSD` (broker-specific)

### Indices
- `SP:SPX`, `NASDAQ:NDX`, `DJ:DJI`, `CBOE:VIX`, `TVC:DXY`
- `INDEX:NKY`, `INDEX:DEU40`, `FOREXCOM:UKXGBP`

### Stocks
- `NASDAQ:AAPL`, `NASDAQ:TSLA`, `NASDAQ:MSFT`, `NASDAQ:AMZN`
- `NASDAQ:GOOGL`, `NASDAQ:NVDA`, `NASDAQ:META`
- `NYSE:JPM`, `NYSE:V`, `NYSE:JNJ`

### Crypto
- `BINANCE:BTCUSDT`, `BINANCE:ETHUSDT`, `BINANCE:SOLUSDT`
- `COINBASE:BTCUSD`, `BITSTAMP:BTCUSD`

### Futures
- `CME_MINI:ES1!`, `CME:6E1!`, `COMEX:GC1!`, `NYMEX:CL1!`

---

## Themes

All components support `'light'` and `'dark'` themes:

```js
new Chart(container, { theme: 'dark' });   // Dark background
new Chart(container, { theme: 'light' });  // White background
```

---

## CSS Layout Helpers

The included stylesheet provides layout utilities:

```html
<link rel="stylesheet" href="tvcomponents/src/styles/components.css" />

<!-- Grid layouts -->
<div class="tv-grid tv-grid-2">...</div>   <!-- 2-column grid -->
<div class="tv-grid tv-grid-3">...</div>   <!-- 3-column grid -->
<div class="tv-grid tv-grid-4">...</div>   <!-- 4-column grid -->

<!-- Dashboard layout -->
<div class="tv-dashboard">
  <div class="tv-dashboard__main"><!-- Chart --></div>
  <div class="tv-dashboard__sidebar"><!-- Watchlist --></div>
</div>

<!-- Card wrapper -->
<div class="tv-card">
  <div class="tv-card__header">Title</div>
  <div class="tv-card__body"><!-- Widget --></div>
</div>
```

---

## File Structure

```
tvcomponents/
├── README.md                          # This file
├── package.json                       # Package metadata
├── demo/
│   └── index.html                     # Full demo page with all components
├── src/
│   ├── index.js                       # Main entry - exports all components
│   ├── components/
│   │   ├── Chart.js                   # Advanced chart (candlesticks, indicators)
│   │   ├── TechnicalAnalysis.js       # Buy/Sell/Neutral gauge
│   │   ├── Watchlist.js               # Market quotes watchlist
│   │   ├── TickerTape.js              # Scrolling ticker tape
│   │   ├── SymbolInfo.js              # Symbol detail info
│   │   ├── SymbolOverview.js          # Multi-symbol overview chart
│   │   ├── MarketOverview.js          # Multi-tab market overview
│   │   ├── MiniChart.js               # Compact mini chart
│   │   ├── Screener.js                # Stock/forex/crypto screener
│   │   ├── ForexCrossRates.js         # Forex cross rate matrix
│   │   ├── ForexHeatMap.js            # Forex heat map
│   │   ├── CryptoMarket.js            # Crypto heatmap
│   │   ├── StockMarket.js             # Stock hotlists
│   │   ├── StockHeatmap.js            # Stock market heatmap
│   │   ├── EconomicCalendar.js        # Economic calendar
│   │   ├── Timeline.js                # News timeline
│   │   ├── CompanyProfile.js          # Company profile
│   │   └── FundamentalData.js         # Financial data
│   ├── styles/
│   │   └── components.css             # Base styles & layout helpers
│   └── utils/
│       ├── config.js                  # Default symbols, themes, intervals
│       └── widgetLoader.js            # Script loader & widget embedder
```

---

## Building a Trading Dashboard

Here's a complete example combining multiple components into a trading workspace:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="tvcomponents/src/styles/components.css" />
  <style>
    body { background: #131722; margin: 0; }
    .dashboard {
      display: grid;
      grid-template-columns: 3fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
      padding: 16px;
      height: 100vh;
    }
    .chart-area { grid-row: 1 / 2; }
    .bottom-area { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .sidebar { grid-row: 1 / 3; grid-column: 2; }
  </style>
</head>
<body>
  <!-- Ticker across top -->
  <div id="ticker"></div>

  <div class="dashboard">
    <div class="chart-area">
      <div id="main-chart" style="height: 500px;"></div>
    </div>
    <div class="bottom-area">
      <div id="technicals" style="height: 400px;"></div>
      <div id="screener" style="height: 400px;"></div>
    </div>
    <div class="sidebar">
      <div id="watchlist" style="height: 100%;"></div>
    </div>
  </div>

  <script type="module">
    import {
      Chart, TechnicalAnalysis, Watchlist,
      Screener, TickerTape
    } from './tvcomponents/src/index.js';

    new TickerTape(document.getElementById('ticker'), { theme: 'dark' });

    new Chart(document.getElementById('main-chart'), {
      symbol: 'FX:GBPUSD',
      interval: '15',
      theme: 'dark',
      height: '500',
    });

    new TechnicalAnalysis(document.getElementById('technicals'), {
      symbol: 'FX:GBPUSD',
      theme: 'dark',
      height: '400',
    });

    new Screener(document.getElementById('screener'), {
      theme: 'dark',
      market: 'forex',
      height: '400',
    });

    new Watchlist(document.getElementById('watchlist'), {
      theme: 'dark',
      height: '916',
    });
  </script>
</body>
</html>
```

---

## License

MIT. TradingView widgets are subject to [TradingView's terms of use](https://www.tradingview.com/policies/).
