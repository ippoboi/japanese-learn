// Utility helper functions

// Fisher-Yates shuffle algorithm
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random element from array
export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Get random index from array
export function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
