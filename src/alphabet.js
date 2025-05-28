import { hiraganaData, katakanaData } from "./data/characters.js";
import { CharacterGrid } from "./components/CharacterGrid.js";
import { Flashcard } from "./components/Flashcard.js";
import { Navigation } from "./components/Navigation.js";
import {
  getElementById,
  addEventListener,
  addClass,
  removeClass,
} from "./utils/dom.js";
import { shuffleArray } from "./utils/helpers.js";

class AlphabetApp {
  constructor() {
    this.currentAlphabet = "hiragana";
    this.practicedCount = 0;
    this.currentSection = "alphabet";
    this.currentSubsection = "hiragana";

    // Check URL parameters for alphabet type
    this.checkUrlParameters();

    // Initialize DOM elements
    this.initializeElements();

    // Initialize navigation
    this.navigation = new Navigation(
      this.elements.sidebar,
      (section, subsection) => this.handleNavigation(section, subsection)
    );

    // Initialize alphabet components
    this.initializeAlphabetModule();

    // Setup event listeners
    this.setupEventListeners();

    // Initial render
    this.renderCharacterGrid();
    this.updateStats();
    this.updatePageTitle();

    // Set navigation to reflect current alphabet
    this.navigation.setActiveSection("alphabet", this.currentAlphabet);
  }

  checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const alphabetParam = urlParams.get("alphabet");
    if (alphabetParam === "hiragana" || alphabetParam === "katakana") {
      this.currentAlphabet = alphabetParam;
      this.currentSubsection = alphabetParam;
    }
  }

  initializeElements() {
    this.elements = {
      // Navigation
      sidebar: getElementById("sidebar"),
      pageTitle: getElementById("pageTitle"),
      contentContainer: getElementById("contentContainer"),
      alphabetModule: getElementById("alphabetModule"),

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
    // Initialize character grid and flashcard components
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

  setupEventListeners() {
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

    // Handle navigation to different pages/sections
    switch (section) {
      case "dashboard":
        window.location.href = "../index.html";
        break;
      case "alphabet":
        if (subsection === "hiragana" || subsection === "katakana") {
          this.currentAlphabet = subsection;
          this.currentSubsection = subsection;
          this.switchAlphabet(subsection);
        } else if (subsection === "alphabet-quiz") {
          // TODO: Navigate to quiz mode when implemented
          console.log("Quiz mode coming soon");
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
    const alphabetName =
      this.currentAlphabet.charAt(0).toUpperCase() +
      this.currentAlphabet.slice(1);
    this.elements.pageTitle.textContent = `${alphabetName} Learning`;
  }

  switchAlphabet(alphabet) {
    this.currentAlphabet = alphabet;
    this.currentSubsection = alphabet;

    // Clear selections and render new grid
    if (this.characterGrid) {
      this.characterGrid.clearAll();
      this.renderCharacterGrid();
    }

    if (this.flashcard) {
      this.flashcard.reset();
    }

    // Update page title
    this.updatePageTitle();

    // Update navigation to reflect alphabet change
    this.navigation.setActiveSection("alphabet", alphabet);

    // Update URL without page reload
    const newUrl = `${window.location.pathname}?alphabet=${alphabet}`;
    window.history.pushState({ alphabet }, "", newUrl);
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

// Initialize the alphabet app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AlphabetApp();
});
