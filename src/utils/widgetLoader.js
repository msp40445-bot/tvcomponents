/**
 * TradingView Widget Script Loader
 * Manages loading of TradingView's official widget scripts.
 */

const WIDGET_BASE_URL = "https://s3.tradingview.com/external-embedding/embed-widget-";
const TV_SCRIPT_URL = "https://s3.tradingview.com/tv.js";

const loadedScripts = new Map();

/**
 * Load a script by URL. Returns a promise that resolves when loaded.
 * Caches scripts so they are only loaded once.
 */
export function loadScript(url) {
  if (loadedScripts.has(url)) {
    return loadedScripts.get(url);
  }

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });

  loadedScripts.set(url, promise);
  return promise;
}

/**
 * Load the main TradingView library (tv.js).
 */
export function loadTVLibrary() {
  return loadScript(TV_SCRIPT_URL);
}

/**
 * Load a TradingView embed widget script.
 * @param {string} widgetName - e.g. "advanced-chart", "technical-analysis", etc.
 */
export function loadWidgetScript(widgetName) {
  return loadScript(`${WIDGET_BASE_URL}${widgetName}.js`);
}

/**
 * Create a container div for a widget.
 * @param {string} id - Unique ID for the container
 * @param {HTMLElement} parentEl - Parent element to append to
 * @param {object} styles - Optional inline styles
 * @returns {HTMLElement}
 */
export function createWidgetContainer(id, parentEl, styles = {}) {
  const container = document.createElement("div");
  container.id = id;
  container.className = "tradingview-widget-container";

  const defaultStyles = {
    width: "100%",
    height: "100%",
  };

  Object.assign(container.style, defaultStyles, styles);

  if (parentEl) {
    parentEl.appendChild(container);
  }

  return container;
}

/**
 * Inject a TradingView embed widget using the standard embed pattern.
 * @param {HTMLElement} container - Container element
 * @param {string} widgetName - Widget type name
 * @param {object} config - Widget configuration object
 */
export function embedWidget(container, widgetName, config) {
  // Clear any existing content
  container.innerHTML = "";

  // Create the inner widget container
  const widgetDiv = document.createElement("div");
  widgetDiv.className = "tradingview-widget-container__widget";
  widgetDiv.style.height = "calc(100% - 32px)";
  widgetDiv.style.width = "100%";
  container.appendChild(widgetDiv);

  // Create copyright div (required by TradingView)
  const copyright = document.createElement("div");
  copyright.className = "tradingview-widget-copyright";
  copyright.innerHTML = `<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>`;
  container.appendChild(copyright);

  // Create and inject the script
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${widgetName}.js`;
  script.async = true;
  script.textContent = JSON.stringify(config);
  container.appendChild(script);
}

/**
 * Generate a unique ID for widget containers.
 */
let idCounter = 0;
export function generateId(prefix = "tv-widget") {
  return `${prefix}-${++idCounter}-${Date.now()}`;
}
