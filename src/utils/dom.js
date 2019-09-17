import {Position} from './enum';


/**
 * Возвращает DOM на основе разметки.
 *
 * @param {string} template - разметка.
 * @return {Node} DOM разметки.
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/**
 * Вставляет элемент в определенную позицию контейнера.
 *
 * @param {Node} container - контейнер.
 * @param {Node} element - элемент.
 * @param {Position} place - позиция.
 */
export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.insertAdjacentElement(place, element);
      break;
  }
};

/**
 * Удалить DOM-элемент.
 *
 * @param {Node} element - элемент.
 */
export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

/**
 * Скрыть node.
 *
 * @param {Node} node - необходимый node.
 */
export const hideElement = (node) => {
  node.classList.add(`visually-hidden`);
};

/**
 * Показать node.
 *
 * @param {Node} node - необходимый node.
 */
export const showElement = (node) => {
  node.classList.remove(`visually-hidden`);
};
