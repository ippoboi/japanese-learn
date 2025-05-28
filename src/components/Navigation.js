import {
  createElement,
  addClass,
  removeClass,
  toggleClass,
  addEventListener,
} from "../utils/dom.js";

export class Navigation {
  constructor(container, onNavigate) {
    this.container = container;
    this.onNavigate = onNavigate;
    this.isCollapsed = false;
    this.activeSection = "dashboard";
    this.activeSubsection = null;
    this.expandedSections = new Set(); // Start with no sections expanded by default

    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="sidebar-header">
        <div class="logo-section">
          <img src="logo-japanese.png" alt="App Logo" class="sidebar-logo" />
          <span class="app-title">Nihon Learning</span>
        </div>
        <button class="sidebar-toggle" id="sidebarToggle">
          <span class="hamburger"></span>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <ul class="nav-menu">
          ${this.renderNavSection("dashboard", "Dashboard", "📊", [])}
          ${this.renderNavSection("alphabet", "Alphabet", "あ", [
            { id: "hiragana", label: "Hiragana", icon: "あ" },
            { id: "katakana", label: "Katakana", icon: "ア" },
            { id: "alphabet-quiz", label: "Quiz Mode", icon: "📝" },
          ])}
          ${this.renderNavSection("kanji", "Kanji", "漢", [
            { id: "kanji-recognition", label: "Recognition", icon: "👁️" },
            { id: "kanji-stroke", label: "Stroke Order", icon: "✏️" },
            { id: "kanji-context", label: "Context", icon: "📖" },
          ])}
          ${this.renderNavSection("vocabulary", "Vocabulary", "📚", [
            { id: "vocab-flashcards", label: "Flashcards", icon: "🗂️" },
            { id: "vocab-categories", label: "Categories", icon: "🏷️" },
            { id: "vocab-matching", label: "Matching", icon: "🔗" },
          ])}
          ${this.renderNavSection("grammar", "Grammar", "文", [
            { id: "grammar-particles", label: "Particles", icon: "は" },
            { id: "grammar-conjugation", label: "Conjugation", icon: "動" },
            { id: "grammar-sentences", label: "Sentences", icon: "💬" },
          ])}
          ${this.renderNavSection("listening", "Listening", "🎧", [
            { id: "listening-dialogs", label: "Dialogs", icon: "🗣️" },
            { id: "listening-dictation", label: "Dictation", icon: "⌨️" },
          ])}
          ${this.renderNavSection("reading", "Reading", "📖", [
            { id: "reading-passages", label: "Passages", icon: "📄" },
            { id: "reading-comprehension", label: "Comprehension", icon: "🤔" },
          ])}
          ${this.renderNavSection("exam", "Mock Exam", "🎯", [
            { id: "exam-practice", label: "Practice Test", icon: "📝" },
            { id: "exam-review", label: "Review", icon: "📊" },
          ])}
        </ul>
      </nav>
    `;
  }

  renderNavSection(sectionId, title, icon, subsections) {
    const isExpanded = this.expandedSections.has(sectionId);
    const isActive = this.activeSection === sectionId;
    const hasSubmenu = subsections.length > 0;

    return `
      <li class="nav-item ${isActive ? "active" : ""}">
        <button class="nav-link ${hasSubmenu ? "has-submenu" : ""}" 
                data-section="${sectionId}" 
                data-action="${hasSubmenu ? "toggle" : "navigate"}">
          <span class="nav-icon">${icon}</span>
          <span class="nav-text">${title}</span>
          ${
            hasSubmenu
              ? `<span class="submenu-arrow ${
                  isExpanded ? "expanded" : ""
                }">▶</span>`
              : ""
          }
        </button>
        ${
          hasSubmenu
            ? `
          <ul class="submenu ${isExpanded ? "expanded" : ""}">
            ${subsections
              .map(
                (sub) => `
              <li class="submenu-item ${
                this.activeSubsection === sub.id ? "active" : ""
              }">
                <button class="submenu-link" data-section="${sectionId}" data-subsection="${
                  sub.id
                }">
                  <span class="submenu-icon">${sub.icon}</span>
                  <span class="submenu-text">${sub.label}</span>
                </button>
              </li>
            `
              )
              .join("")}
          </ul>
        `
            : ""
        }
      </li>
    `;
  }

  setupEventListeners() {
    // Sidebar toggle
    const toggleBtn = this.container.querySelector("#sidebarToggle");
    addEventListener(toggleBtn, "click", () => this.toggleSidebar());

    // Navigation links
    const navLinks = this.container.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      addEventListener(link, "click", (e) => this.handleNavClick(e));
    });

    // Submenu links
    const submenuLinks = this.container.querySelectorAll(".submenu-link");
    submenuLinks.forEach((link) => {
      addEventListener(link, "click", (e) => this.handleSubmenuClick(e));
    });

    // Close sidebar on mobile when clicking outside
    addEventListener(document, "click", (e) => {
      if (window.innerWidth <= 768 && !this.container.contains(e.target)) {
        this.closeSidebar();
      }
    });
  }

  handleNavClick(e) {
    const button = e.currentTarget;
    const section = button.dataset.section;
    const action = button.dataset.action;

    if (action === "toggle") {
      this.toggleSection(section);
    } else {
      this.navigateToSection(section);
    }
  }

  handleSubmenuClick(e) {
    const button = e.currentTarget;
    const section = button.dataset.section;
    const subsection = button.dataset.subsection;

    this.navigateToSection(section, subsection);
  }

  toggleSection(sectionId) {
    if (this.expandedSections.has(sectionId)) {
      this.expandedSections.delete(sectionId);
    } else {
      this.expandedSections.add(sectionId);
    }
    this.render();
    this.setupEventListeners();
  }

  navigateToSection(section, subsection = null) {
    this.activeSection = section;
    if (subsection) {
      this.activeSubsection = subsection;
    }

    // Ensure the section is expanded if it has subsections
    if (subsection) {
      this.expandedSections.add(section);
    }

    this.render();
    this.setupEventListeners();

    // Notify parent component about navigation
    this.onNavigate(section, subsection);

    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      this.closeSidebar();
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    toggleClass(document.body, "sidebar-collapsed", this.isCollapsed);
  }

  closeSidebar() {
    if (!this.isCollapsed) {
      this.isCollapsed = true;
      addClass(document.body, "sidebar-collapsed");
    }
  }

  openSidebar() {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      removeClass(document.body, "sidebar-collapsed");
    }
  }

  setActiveSection(section, subsection = null) {
    this.activeSection = section;
    if (subsection) {
      this.activeSubsection = subsection;
      this.expandedSections.add(section);
    }
    this.render();
    this.setupEventListeners();
  }
}
