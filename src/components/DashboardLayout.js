/**
 * DashboardLayout - Reusable sidebar + content layout manager
 *
 * Creates a full-page dashboard with a collapsible sidebar for navigation
 * and a main content area. Each "panel" is a self-contained component section
 * that can be shown/hidden via sidebar clicks.
 *
 * Usage:
 *   import { DashboardLayout } from './components/DashboardLayout.js';
 *
 *   const dashboard = new DashboardLayout(document.getElementById('app'), {
 *     title: 'My Trading Dashboard',
 *     theme: 'dark',
 *     panels: [
 *       { id: 'chart', label: 'Chart', icon: '📈', group: 'Charts' },
 *       { id: 'ta', label: 'Technical Analysis', icon: '🎯', group: 'Analysis' },
 *     ],
 *     onPanelChange: (panelId) => { ... },
 *   });
 *
 *   // Get the container for a panel to mount widgets into
 *   const chartContainer = dashboard.getPanelContent('chart');
 *
 *   // Programmatically switch panels
 *   dashboard.showPanel('ta');
 */

export class DashboardLayout {
  /**
   * @param {HTMLElement} root - Root element to render the dashboard into
   * @param {object} options
   * @param {string} [options.title='TV Components'] - Dashboard title
   * @param {string} [options.theme='dark'] - 'light' or 'dark'
   * @param {Array} options.panels - Array of panel definitions
   * @param {Function} [options.onPanelChange] - Callback when active panel changes
   * @param {string} [options.defaultPanel] - ID of the default active panel
   * @param {boolean} [options.sidebarCollapsed=false] - Start with sidebar collapsed
   */
  constructor(root, options = {}) {
    this.root = root;
    this.options = {
      title: "TV Components",
      theme: "dark",
      panels: [],
      onPanelChange: null,
      defaultPanel: null,
      sidebarCollapsed: false,
      ...options,
    };
    this.activePanel = this.options.defaultPanel || (this.options.panels[0]?.id ?? null);
    this.sidebarCollapsed = this.options.sidebarCollapsed;
    this.panelContainers = {};
    this.render();
  }

  render() {
    this.root.innerHTML = "";
    this.root.classList.add("tvd-root");
    this.root.setAttribute("data-theme", this.options.theme);

    // Build sidebar
    this.sidebar = this._buildSidebar();
    this.root.appendChild(this.sidebar);

    // Build main content area
    this.main = document.createElement("div");
    this.main.className = "tvd-main";
    this.root.appendChild(this.main);

    // Build panel containers
    this.options.panels.forEach((panel) => {
      const panelEl = document.createElement("div");
      panelEl.className = "tvd-panel";
      panelEl.id = `tvd-panel-${panel.id}`;
      panelEl.setAttribute("data-panel", panel.id);

      const header = document.createElement("div");
      header.className = "tvd-panel__header";
      header.innerHTML = `
        <div class="tvd-panel__title">
          <span class="tvd-panel__icon">${panel.icon || ""}</span>
          <span>${panel.label}</span>
        </div>
        <div class="tvd-panel__actions">
          ${panel.description ? `<span class="tvd-panel__desc">${panel.description}</span>` : ""}
        </div>
      `;

      const content = document.createElement("div");
      content.className = "tvd-panel__content";

      panelEl.appendChild(header);
      panelEl.appendChild(content);
      this.main.appendChild(panelEl);
      this.panelContainers[panel.id] = content;
    });

    // Show default panel
    this._updateActivePanel();
  }

  _buildSidebar() {
    const sidebar = document.createElement("aside");
    sidebar.className = `tvd-sidebar${this.sidebarCollapsed ? " tvd-sidebar--collapsed" : ""}`;

    // Logo / title
    const brand = document.createElement("div");
    brand.className = "tvd-sidebar__brand";
    brand.innerHTML = `
      <span class="tvd-sidebar__logo">TV</span>
      <span class="tvd-sidebar__title">${this.options.title}</span>
    `;
    sidebar.appendChild(brand);

    // Toggle button
    const toggle = document.createElement("button");
    toggle.className = "tvd-sidebar__toggle";
    toggle.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 5l4 4 4-4z"/></svg>`;
    toggle.addEventListener("click", () => this.toggleSidebar());
    sidebar.appendChild(toggle);

    // Navigation
    const nav = document.createElement("nav");
    nav.className = "tvd-sidebar__nav";

    // Group panels by group
    const groups = {};
    this.options.panels.forEach((panel) => {
      const group = panel.group || "General";
      if (!groups[group]) groups[group] = [];
      groups[group].push(panel);
    });

    Object.entries(groups).forEach(([groupName, panels]) => {
      const groupEl = document.createElement("div");
      groupEl.className = "tvd-sidebar__group";

      const groupTitle = document.createElement("div");
      groupTitle.className = "tvd-sidebar__group-title";
      groupTitle.textContent = groupName;
      groupEl.appendChild(groupTitle);

      panels.forEach((panel) => {
        const item = document.createElement("button");
        item.className = "tvd-sidebar__item";
        item.setAttribute("data-panel-id", panel.id);
        item.innerHTML = `
          <span class="tvd-sidebar__item-icon">${panel.icon || ""}</span>
          <span class="tvd-sidebar__item-label">${panel.label}</span>
        `;
        item.addEventListener("click", () => this.showPanel(panel.id));
        groupEl.appendChild(item);
      });

      nav.appendChild(groupEl);
    });

    sidebar.appendChild(nav);

    // Theme toggle at bottom
    const footer = document.createElement("div");
    footer.className = "tvd-sidebar__footer";
    const themeBtn = document.createElement("button");
    themeBtn.className = "tvd-sidebar__theme-btn";
    themeBtn.innerHTML = `
      <span class="tvd-sidebar__item-icon">${this.options.theme === "dark" ? "\u2600\uFE0F" : "\u{1F319}"}</span>
      <span class="tvd-sidebar__item-label">${this.options.theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
    `;
    themeBtn.addEventListener("click", () => this.toggleTheme());
    footer.appendChild(themeBtn);
    sidebar.appendChild(footer);

    return sidebar;
  }

  _updateActivePanel() {
    // Update sidebar active state
    this.sidebar.querySelectorAll(".tvd-sidebar__item").forEach((item) => {
      const panelId = item.getAttribute("data-panel-id");
      item.classList.toggle("tvd-sidebar__item--active", panelId === this.activePanel);
    });

    // Show/hide panels
    this.main.querySelectorAll(".tvd-panel").forEach((panel) => {
      const panelId = panel.getAttribute("data-panel");
      panel.classList.toggle("tvd-panel--active", panelId === this.activePanel);
    });
  }

  /**
   * Show a specific panel by ID.
   * @param {string} panelId
   */
  showPanel(panelId) {
    if (this.activePanel === panelId) return;
    this.activePanel = panelId;
    this._updateActivePanel();
    if (this.options.onPanelChange) {
      this.options.onPanelChange(panelId);
    }
  }

  /**
   * Get the content container for a panel (to mount widgets into).
   * @param {string} panelId
   * @returns {HTMLElement|null}
   */
  getPanelContent(panelId) {
    return this.panelContainers[panelId] || null;
  }

  /**
   * Toggle sidebar collapsed state.
   */
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebar.classList.toggle("tvd-sidebar--collapsed", this.sidebarCollapsed);
  }

  /**
   * Toggle between light and dark theme.
   */
  toggleTheme() {
    this.options.theme = this.options.theme === "dark" ? "light" : "dark";
    this.root.setAttribute("data-theme", this.options.theme);
    // Re-render sidebar to update theme button
    const oldSidebar = this.sidebar;
    this.sidebar = this._buildSidebar();
    this.root.replaceChild(this.sidebar, oldSidebar);
    this._updateActivePanel();
  }

  /**
   * Get the current theme.
   * @returns {string}
   */
  getTheme() {
    return this.options.theme;
  }

  /**
   * Get the active panel ID.
   * @returns {string}
   */
  getActivePanel() {
    return this.activePanel;
  }

  /**
   * Destroy the dashboard layout.
   */
  destroy() {
    this.root.innerHTML = "";
    this.root.classList.remove("tvd-root");
    this.root.removeAttribute("data-theme");
    this.panelContainers = {};
  }
}

export default DashboardLayout;
