// DOM utility functions
export function getElementById(id) {
  return document.getElementById(id);
}

export function querySelectorAll(selector) {
  return document.querySelectorAll(selector);
}

export function createElement(tag, className, innerHTML) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

export function toggleClass(element, className, condition) {
  element.classList.toggle(className, condition);
}

export function addClass(element, className) {
  element.classList.add(className);
}

export function removeClass(element, className) {
  element.classList.remove(className);
}

export function addEventListener(element, event, handler) {
  element.addEventListener(event, handler);
}
