import { createElement, toggleClass, addEventListener } from "../utils/dom.js";

export class CharacterGrid {
  constructor(container, onSelectionChange) {
    this.container = container;
    this.onSelectionChange = onSelectionChange;
    this.selectedCharacters = [];
  }

  render(data) {
    this.container.innerHTML = "";
    this.data = data;

    data.forEach((item, index) => {
      const checkbox = createElement("div", "character-checkbox");
      checkbox.innerHTML = `
        <input type="checkbox" id="char-${index}" data-index="${index}">
        <div class="character-display">${item.char}</div>
        <div class="character-romaji">${item.romaji}</div>
      `;

      const input = checkbox.querySelector("input");

      addEventListener(input, "change", (e) => {
        this.updateSelection(index, e.target.checked);
        this.updateCardAppearance(checkbox, e.target.checked);
      });

      // Make the entire card clickable
      addEventListener(checkbox, "click", (e) => {
        if (e.target.type !== "checkbox") {
          input.checked = !input.checked;
          this.updateSelection(index, input.checked);
          this.updateCardAppearance(checkbox, input.checked);
        }
      });

      this.container.appendChild(checkbox);
    });
  }

  updateCardAppearance(cardElement, isSelected) {
    toggleClass(cardElement, "selected", isSelected);
  }

  updateSelection(index, isSelected) {
    const character = this.data[index];

    if (isSelected) {
      this.selectedCharacters.push(character);
    } else {
      this.selectedCharacters = this.selectedCharacters.filter(
        (char) => char.char !== character.char
      );
    }

    this.onSelectionChange(this.selectedCharacters);
  }

  selectAll() {
    this.selectedCharacters = [...this.data];
    this.updateAllCheckboxes(true);
    this.onSelectionChange(this.selectedCharacters);
  }

  clearAll() {
    this.selectedCharacters = [];
    this.updateAllCheckboxes(false);
    this.onSelectionChange(this.selectedCharacters);
  }

  selectBasic() {
    this.selectedCharacters = this.data.filter((item) => item.basic);

    const checkboxes = this.container.querySelectorAll(
      'input[type="checkbox"]'
    );
    const cards = this.container.querySelectorAll(".character-checkbox");

    checkboxes.forEach((cb, index) => {
      const isBasic = this.data[index].basic;
      cb.checked = isBasic;
      this.updateCardAppearance(cards[index], isBasic);
    });

    this.onSelectionChange(this.selectedCharacters);
  }

  updateAllCheckboxes(checked) {
    const checkboxes = this.container.querySelectorAll(
      'input[type="checkbox"]'
    );
    const cards = this.container.querySelectorAll(".character-checkbox");

    checkboxes.forEach((cb, index) => {
      cb.checked = checked;
      this.updateCardAppearance(cards[index], checked);
    });
  }

  getSelectedCharacters() {
    return this.selectedCharacters;
  }
}
