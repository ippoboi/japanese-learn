import { addClass, removeClass } from "../utils/dom.js";
import { getRandomIndex } from "../utils/helpers.js";

export class Flashcard {
  constructor(container) {
    this.container = container;
    this.currentCard = null;
    this.isFlipped = false;
    this.practiceMode = "character"; // "character", "romaji", or "random"
    this.currentRandomDisplay = null;
  }

  setPracticeMode(mode) {
    this.practiceMode = mode;
    if (this.currentCard) {
      this.isFlipped = false;
      this.render();
    }
  }

  showCard(selectedCharacters) {
    if (selectedCharacters.length === 0) {
      alert("Please select some characters first!");
      return;
    }

    const randomIndex = getRandomIndex(selectedCharacters);
    this.currentCard = selectedCharacters[randomIndex];
    this.isFlipped = false;

    // For random mode, randomly choose what to show first
    if (this.practiceMode === "random") {
      this.currentRandomDisplay = Math.random() < 0.5 ? "character" : "romaji";
    }

    this.render();
  }

  flip() {
    if (!this.currentCard) return;

    this.isFlipped = !this.isFlipped;
    this.render();
  }

  render() {
    if (!this.currentCard) {
      this.reset();
      return;
    }

    this.container.className = `flashcard ${this.isFlipped ? "flipped" : ""}`;

    if (!this.isFlipped) {
      // Show the initial side based on practice mode
      if (this.practiceMode === "character") {
        this.container.innerHTML = `
          <div class="character-large">${this.currentCard.char}</div>
          <div class="instructions">Click to reveal pronunciation</div>
        `;
      } else if (this.practiceMode === "romaji") {
        this.container.innerHTML = `
          <div class="romaji-large">${this.currentCard.romaji}</div>
          <div class="instructions">Click to reveal character</div>
        `;
      } else if (this.practiceMode === "random") {
        if (this.currentRandomDisplay === "character") {
          this.container.innerHTML = `
            <div class="character-large">${this.currentCard.char}</div>
            <div class="instructions">Click to reveal pronunciation</div>
          `;
        } else {
          this.container.innerHTML = `
            <div class="romaji-large">${this.currentCard.romaji}</div>
            <div class="instructions">Click to reveal character</div>
          `;
        }
      }
    } else {
      // Show both when flipped
      let hideInstruction = "pronunciation";
      if (
        this.practiceMode === "romaji" ||
        (this.practiceMode === "random" &&
          this.currentRandomDisplay === "romaji")
      ) {
        hideInstruction = "character";
      }

      this.container.innerHTML = `
        <div class="character-large">${this.currentCard.char}</div>
        <div class="romaji-large">${this.currentCard.romaji}</div>
        <div class="instructions">Click to hide ${hideInstruction}</div>
      `;
    }
  }

  reset() {
    this.currentCard = null;
    this.isFlipped = false;
    this.container.className = "flashcard";
    this.container.innerHTML = `
      <div class="no-selection">
        Select some characters to start practicing!
      </div>
    `;
  }
}
