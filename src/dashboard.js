import { Navigation } from "./components/Navigation.js";
import { getElementById, addClass, removeClass } from "./utils/dom.js";

class DashboardApp {
  constructor() {
    this.currentSection = "dashboard";

    // Initialize DOM elements
    this.initializeElements();

    // Initialize navigation
    this.navigation = new Navigation(
      this.elements.sidebar,
      (section, subsection) => this.handleNavigation(section, subsection)
    );

    // Set initial state
    this.updatePageTitle();
    this.navigation.setActiveSection("dashboard");
  }

  initializeElements() {
    this.elements = {
      sidebar: getElementById("sidebar"),
      pageTitle: getElementById("pageTitle"),
      contentContainer: getElementById("contentContainer"),
      dashboardModule: getElementById("dashboardModule"),
    };
  }

  handleNavigation(section, subsection) {
    console.log("Navigating to:", section, subsection);

    // Handle navigation to different pages
    switch (section) {
      case "dashboard":
        // Already on dashboard, do nothing
        break;
      case "alphabet":
        if (subsection === "hiragana" || subsection === "katakana") {
          window.location.href = `./pages/alphabet.html?alphabet=${subsection}`;
        } else {
          window.location.href = "./pages/alphabet.html";
        }
        break;
      case "kanji":
        // TODO: Navigate to kanji page when implemented
        console.log("Kanji module coming soon");
        break;
      case "vocabulary":
        // TODO: Navigate to vocabulary page when implemented
        console.log("Vocabulary module coming soon");
        break;
      case "grammar":
        // TODO: Navigate to grammar page when implemented
        console.log("Grammar module coming soon");
        break;
      case "listening":
        // TODO: Navigate to listening page when implemented
        console.log("Listening module coming soon");
        break;
      case "reading":
        // TODO: Navigate to reading page when implemented
        console.log("Reading module coming soon");
        break;
      case "exam":
        // TODO: Navigate to exam page when implemented
        console.log("Exam module coming soon");
        break;
      default:
        console.log("Unknown section:", section);
    }
  }

  updatePageTitle() {
    this.elements.pageTitle.textContent = "Dashboard";
  }
}

// Initialize the dashboard app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DashboardApp();
});
