/**
 * Default configuration for TradingView components.
 * Override any of these when instantiating components.
 */

export const DEFAULT_SYMBOLS = {
  forex: [
    { symbol: "FX:GBPUSD", label: "GBP/USD" },
    { symbol: "FX:EURUSD", label: "EUR/USD" },
    { symbol: "FX:USDJPY", label: "USD/JPY" },
    { symbol: "FX:AUDUSD", label: "AUD/USD" },
    { symbol: "OANDA:XAUUSD", label: "Gold" },
  ],
  indices: [
    { symbol: "SP:SPX", label: "S&P 500" },
    { symbol: "NASDAQ:NDX", label: "Nasdaq 100" },
    { symbol: "DJ:DJI", label: "Dow Jones" },
    { symbol: "CBOE:VIX", label: "VIX" },
    { symbol: "TVC:DXY", label: "US Dollar Index" },
  ],
  stocks: [
    { symbol: "NASDAQ:AAPL", label: "Apple" },
    { symbol: "NASDAQ:TSLA", label: "Tesla" },
    { symbol: "NASDAQ:MSFT", label: "Microsoft" },
    { symbol: "NASDAQ:AMZN", label: "Amazon" },
    { symbol: "NASDAQ:GOOGL", label: "Google" },
    { symbol: "NASDAQ:NVDA", label: "NVIDIA" },
    { symbol: "NASDAQ:META", label: "Meta" },
  ],
  crypto: [
    { symbol: "BINANCE:BTCUSDT", label: "Bitcoin" },
    { symbol: "BINANCE:ETHUSDT", label: "Ethereum" },
    { symbol: "BINANCE:SOLUSDT", label: "Solana" },
    { symbol: "BINANCE:XRPUSDT", label: "XRP" },
  ],
};

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

export const INTERVALS = {
  "1m": "1",
  "5m": "5",
  "15m": "15",
  "30m": "30",
  "1h": "60",
  "2h": "120",
  "4h": "240",
  "1D": "D",
  "1W": "W",
  "1M": "M",
};

export const CHART_STYLES = {
  BARS: 0,
  CANDLES: 1,
  LINE: 2,
  AREA: 3,
  HEIKIN_ASHI: 8,
  HOLLOW_CANDLES: 9,
  RENKO: 4,
  KAGI: 5,
  POINT_AND_FIGURE: 6,
  LINE_BREAK: 7,
};

export const COLOR_THEMES = {
  light: {
    background: "#ffffff",
    text: "#131722",
    grid: "#e1ecf2",
    border: "#e1ecf2",
    upColor: "#26a69a",
    downColor: "#ef5350",
  },
  dark: {
    background: "#131722",
    text: "#d1d4dc",
    grid: "#1e222d",
    border: "#2a2e39",
    upColor: "#26a69a",
    downColor: "#ef5350",
  },
};
