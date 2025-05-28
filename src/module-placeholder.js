import { Navigation } from "./components/Navigation.js";
import { getElementById } from "./utils/dom.js";

class ModulePlaceholderApp {
  constructor() {
    // Determine current module from page title
    this.currentSection = this.getCurrentSection();

    // Initialize DOM elements
    this.initializeElements();

    // Initialize navigation
    this.navigation = new Navigation(
      this.elements.sidebar,
      (section, subsection) => this.handleNavigation(section, subsection)
    );

    // Set navigation state
    this.navigation.setActiveSection(this.currentSection);
  }

  getCurrentSection() {
    const title = document.title.toLowerCase();
    if (title.includes("kanji")) return "kanji";
    if (title.includes("vocabulary")) return "vocabulary";
    if (title.includes("grammar")) return "grammar";
    if (title.includes("listening")) return "listening";
    if (title.includes("reading")) return "reading";
    if (title.includes("exam")) return "exam";
    return "dashboard";
  }

  initializeElements() {
    this.elements = {
      sidebar: getElementById("sidebar"),
      pageTitle: getElementById("pageTitle"),
      contentContainer: getElementById("contentContainer"),
    };
  }

  handleNavigation(section, subsection) {
    console.log("Navigating to:", section, subsection);

    // Handle navigation to different pages/sections
    switch (section) {
      case "dashboard":
        window.location.href = "../index.html";
        break;
      case "alphabet":
        if (subsection === "hiragana" || subsection === "katakana") {
          window.location.href = `./alphabet.html?alphabet=${subsection}`;
        } else {
          window.location.href = "./alphabet.html";
        }
        break;
      case "kanji":
        if (window.location.pathname.includes("kanji")) {
          // Already on kanji page
          console.log("Already on kanji page");
        } else {
          window.location.href = "./kanji.html";
        }
        break;
      case "vocabulary":
        console.log("Vocabulary module coming soon");
        break;
      case "grammar":
        console.log("Grammar module coming soon");
        break;
      case "listening":
        console.log("Listening module coming soon");
        break;
      case "reading":
        console.log("Reading module coming soon");
        break;
      case "exam":
        console.log("Exam module coming soon");
        break;
      default:
        console.log("Unknown section:", section);
    }
  }
}

// Initialize the placeholder app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ModulePlaceholderApp();
});
