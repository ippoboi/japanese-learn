import { hiraganaData, katakanaData } from "./data/characters.js";
import { CharacterGrid } from "./components/CharacterGrid.js";
import { Flashcard } from "./components/Flashcard.js";
import { Navigation } from "./components/Navigation.js";
import {
  getElementById,
  querySelectorAll,
  addEventListener,
  toggleClass,
  addClass,
  removeClass,
} from "./utils/dom.js";
import { shuffleArray } from "./utils/helpers.js";

class JapaneseApp {
  constructor() {
    this.currentAlphabet = "hiragana";
    this.practicedCount = 0;
    this.currentSection = "alphabet";
    this.currentSubsection = "hiragana";

    // Initialize DOM elements
    this.initializeElements();

    // Initialize navigation
    this.navigation = new Navigation(
      this.elements.sidebar,
      (section, subsection) => this.handleNavigation(section, subsection)
    );

    // Initialize components (only for alphabet module initially)
    this.initializeAlphabetModule();

    // Setup event listeners for alphabet module
    this.setupAlphabetEventListeners();

    // Initial render
    this.renderCharacterGrid();
    this.updateStats();
    this.updatePageTitle();
  }

  initializeElements() {
    this.elements = {
      // Navigation
      sidebar: getElementById("sidebar"),
      pageTitle: getElementById("pageTitle"),
      contentContainer: getElementById("contentContainer"),

      // Module containers
      alphabetModule: getElementById("alphabetModule"),
      dashboardModule: getElementById("dashboardModule"),
      kanjiModule: getElementById("kanjiModule"),
      vocabularyModule: getElementById("vocabularyModule"),
      grammarModule: getElementById("grammarModule"),
      listeningModule: getElementById("listeningModule"),
      readingModule: getElementById("readingModule"),
      examModule: getElementById("examModule"),

      // Alphabet module elements
      characterGrid: getElementById("characterGrid"),
      selectAllBtn: getElementById("selectAll"),
      clearAllBtn: getElementById("clearAll"),
      selectBasicBtn: getElementById("selectBasic"),
      nextCardBtn: getElementById("nextCard"),
      shuffleBtn: getElementById("shuffleCards"),
      flashcard: getElementById("flashcard"),
      selectedCount: getElementById("selectedCount"),
      practicedCount: getElementById("practicedCount"),
      practiceModeDropdown: getElementById("practiceMode"),
    };
  }

  initializeAlphabetModule() {
    // Only initialize if alphabet elements exist
    if (this.elements.characterGrid && this.elements.flashcard) {
      this.characterGrid = new CharacterGrid(
        this.elements.characterGrid,
        (selectedCharacters) => this.onSelectionChange(selectedCharacters)
      );

      this.flashcard = new Flashcard(this.elements.flashcard);
    }
  }

  getCurrentData() {
    return this.currentAlphabet === "hiragana" ? hiraganaData : katakanaData;
  }

  setupAlphabetEventListeners() {
    // Only setup if elements exist
    if (!this.elements.characterGrid) return;

    // Practice mode dropdown
    if (this.elements.practiceModeDropdown) {
      addEventListener(this.elements.practiceModeDropdown, "change", (e) =>
        this.switchPracticeMode(e.target.value)
      );
    }

    // Control buttons
    if (this.elements.selectAllBtn) {
      addEventListener(this.elements.selectAllBtn, "click", () =>
        this.characterGrid.selectAll()
      );
    }

    if (this.elements.clearAllBtn) {
      addEventListener(this.elements.clearAllBtn, "click", () =>
        this.characterGrid.clearAll()
      );
    }

    if (this.elements.selectBasicBtn) {
      addEventListener(this.elements.selectBasicBtn, "click", () =>
        this.characterGrid.selectBasic()
      );
    }

    if (this.elements.nextCardBtn) {
      addEventListener(this.elements.nextCardBtn, "click", () =>
        this.showNextCard()
      );
    }

    if (this.elements.shuffleBtn) {
      addEventListener(this.elements.shuffleBtn, "click", () =>
        this.shuffleCards()
      );
    }

    if (this.elements.flashcard) {
      addEventListener(this.elements.flashcard, "click", () =>
        this.flashcard.flip()
      );
    }
  }

  handleNavigation(section, subsection) {
    console.log("Navigating to:", section, subsection);

    // Update current section and subsection
    this.currentSection = section;
    this.currentSubsection = subsection || section;

    // Update page title
    this.updatePageTitle();

    // Hide all modules
    this.hideAllModules();

    // Show the appropriate module
    this.showModule(section, subsection);

    // Handle alphabet subsection navigation
    if (
      section === "alphabet" &&
      (subsection === "hiragana" || subsection === "katakana")
    ) {
      this.currentAlphabet = subsection;
      this.switchAlphabet(subsection);
    }
  }

  hideAllModules() {
    Object.keys(this.elements).forEach((key) => {
      if (key.endsWith("Module")) {
        addClass(this.elements[key], "hidden");
      }
    });
  }

  showModule(section, subsection) {
    let moduleToShow;

    // Map sections to modules
    switch (section) {
      case "alphabet":
        moduleToShow = this.elements.alphabetModule;
        break;
      case "dashboard":
        moduleToShow = this.elements.dashboardModule;
        break;
      case "kanji":
        moduleToShow = this.elements.kanjiModule;
        break;
      case "vocabulary":
        moduleToShow = this.elements.vocabularyModule;
        break;
      case "grammar":
        moduleToShow = this.elements.grammarModule;
        break;
      case "listening":
        moduleToShow = this.elements.listeningModule;
        break;
      case "reading":
        moduleToShow = this.elements.readingModule;
        break;
      case "exam":
        moduleToShow = this.elements.examModule;
        break;
      default:
        moduleToShow = this.elements.alphabetModule;
    }

    if (moduleToShow) {
      removeClass(moduleToShow, "hidden");
    }
  }

  updatePageTitle() {
    const titles = {
      alphabet: "Alphabet Learning",
      dashboard: "Dashboard",
      kanji: "Kanji Practice",
      vocabulary: "Vocabulary",
      grammar: "Grammar",
      listening: "Listening",
      reading: "Reading",
      exam: "Mock Exam",
    };

    const title = titles[this.currentSection] || "Japanese Learning";
    this.elements.pageTitle.textContent = title;
  }

  switchAlphabet(alphabet) {
    this.currentAlphabet = alphabet;

    // Clear selections and render new grid
    if (this.characterGrid) {
      this.characterGrid.clearAll();
      this.renderCharacterGrid();
    }

    if (this.flashcard) {
      this.flashcard.reset();
    }

    // Update navigation to reflect alphabet change
    this.navigation.setActiveSection("alphabet", alphabet);
  }

  switchPracticeMode(mode) {
    // Update dropdown value
    if (this.elements.practiceModeDropdown) {
      this.elements.practiceModeDropdown.value = mode;
    }

    if (this.flashcard) {
      this.flashcard.setPracticeMode(mode);
    }
  }

  renderCharacterGrid() {
    if (this.characterGrid) {
      const data = this.getCurrentData();
      this.characterGrid.render(data);
    }
  }

  onSelectionChange(selectedCharacters) {
    this.updateStats();
    if (selectedCharacters.length === 0 && this.flashcard) {
      this.flashcard.reset();
    }
  }

  showNextCard() {
    if (!this.characterGrid || !this.flashcard) return;

    const selectedCharacters = this.characterGrid.getSelectedCharacters();
    if (selectedCharacters.length === 0) {
      alert("Please select some characters first!");
      return;
    }

    this.flashcard.showCard(selectedCharacters);
    this.practicedCount++;
    this.updateStats();
  }

  shuffleCards() {
    if (!this.characterGrid) return;

    const selectedCharacters = this.characterGrid.getSelectedCharacters();
    if (selectedCharacters.length === 0) {
      alert("Please select some characters first!");
      return;
    }

    // Update the character grid's selected characters with shuffled version
    this.characterGrid.selectedCharacters = shuffleArray(selectedCharacters);
    alert("Cards shuffled!");
  }

  updateStats() {
    if (!this.characterGrid) return;

    const selectedCharacters = this.characterGrid.getSelectedCharacters();

    if (this.elements.selectedCount) {
      this.elements.selectedCount.textContent = selectedCharacters.length;
    }

    if (this.elements.practicedCount) {
      this.elements.practicedCount.textContent = this.practicedCount;
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new JapaneseApp();
});
