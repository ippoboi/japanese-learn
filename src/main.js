import { hiraganaData, katakanaData } from "./data/characters.js";
import { CharacterGrid } from "./components/CharacterGrid.js";
import { Flashcard } from "./components/Flashcard.js";
import {
  getElementById,
  querySelectorAll,
  addEventListener,
  toggleClass,
} from "./utils/dom.js";
import { shuffleArray } from "./utils/helpers.js";

class JapaneseApp {
  constructor() {
    this.currentAlphabet = "hiragana";
    this.practicedCount = 0;

    // Initialize DOM elements
    this.initializeElements();

    // Initialize components
    this.characterGrid = new CharacterGrid(
      this.elements.characterGrid,
      (selectedCharacters) => this.onSelectionChange(selectedCharacters)
    );

    this.flashcard = new Flashcard(this.elements.flashcard);

    // Setup event listeners
    this.setupEventListeners();

    // Initial render
    this.renderCharacterGrid();
    this.updateStats();
  }

  initializeElements() {
    this.elements = {
      characterGrid: getElementById("characterGrid"),
      selectAllBtn: getElementById("selectAll"),
      clearAllBtn: getElementById("clearAll"),
      selectBasicBtn: getElementById("selectBasic"),
      nextCardBtn: getElementById("nextCard"),
      shuffleBtn: getElementById("shuffleCards"),
      flashcard: getElementById("flashcard"),
      selectedCount: getElementById("selectedCount"),
      practicedCount: getElementById("practicedCount"),
    };
  }

  getCurrentData() {
    return this.currentAlphabet === "hiragana" ? hiraganaData : katakanaData;
  }

  setupEventListeners() {
    // Alphabet tabs
    querySelectorAll("[data-alphabet]").forEach((btn) => {
      addEventListener(btn, "click", () =>
        this.switchAlphabet(btn.dataset.alphabet)
      );
    });

    // Practice mode tabs
    querySelectorAll("[data-mode]").forEach((btn) => {
      addEventListener(btn, "click", () =>
        this.switchPracticeMode(btn.dataset.mode)
      );
    });

    // Control buttons
    addEventListener(this.elements.selectAllBtn, "click", () =>
      this.characterGrid.selectAll()
    );
    addEventListener(this.elements.clearAllBtn, "click", () =>
      this.characterGrid.clearAll()
    );
    addEventListener(this.elements.selectBasicBtn, "click", () =>
      this.characterGrid.selectBasic()
    );
    addEventListener(this.elements.nextCardBtn, "click", () =>
      this.showNextCard()
    );
    addEventListener(this.elements.shuffleBtn, "click", () =>
      this.shuffleCards()
    );
    addEventListener(this.elements.flashcard, "click", () =>
      this.flashcard.flip()
    );
  }

  switchAlphabet(alphabet) {
    this.currentAlphabet = alphabet;

    // Update tab appearance
    querySelectorAll("[data-alphabet]").forEach((btn) => {
      toggleClass(btn, "active", btn.dataset.alphabet === alphabet);
    });

    // Clear selections and render new grid
    this.characterGrid.clearAll();
    this.renderCharacterGrid();
    this.flashcard.reset();
  }

  switchPracticeMode(mode) {
    // Update tab appearance for practice mode
    querySelectorAll("[data-mode]").forEach((btn) => {
      toggleClass(btn, "active", btn.dataset.mode === mode);
    });

    this.flashcard.setPracticeMode(mode);
  }

  renderCharacterGrid() {
    const data = this.getCurrentData();
    this.characterGrid.render(data);
  }

  onSelectionChange(selectedCharacters) {
    this.updateStats();
    if (selectedCharacters.length === 0) {
      this.flashcard.reset();
    }
  }

  showNextCard() {
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
    const selectedCharacters = this.characterGrid.getSelectedCharacters();
    this.elements.selectedCount.textContent = selectedCharacters.length;
    this.elements.practicedCount.textContent = this.practicedCount;
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new JapaneseApp();
});
