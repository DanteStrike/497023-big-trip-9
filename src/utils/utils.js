export const TimeValue = {
  MILLISECONDS_IN_SECOND: 1000,
  SECONDS_IN_MINUTE: 60,
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  MILLISECONDS_IN_MINUTE: 1000 * 60,
  MILLISECONDS_IN_HOUR: 1000 * 60 * 60,
  MILLISECONDS_IN_DAY: 1000 * 60 * 60 * 24,
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const Keys = {
  ESCAPE: `Escape`,
  ieESC: `Esc`
};


/**
 * Возвращает случайный число в заданном диапазоне.
 *
 * @param {number} min - нижняя граница диапазона.
 * @param {number} max - верхняя граница диапазона.
 * @return {number} Случайный число.
 */
export const getRandomNumber = (min, max) => {
  if (min > max) {
    throw new Error(`ArgError: "max" = ${max} cant be less than "min" = ${min}`);
  }

  return Math.round(Math.random() * (max - min)) + min;
};

/**
 * Возвращает случайный элемент любого массивоподобного объекта.
 *
 * @param {iterable} iterableObject - итерируемый объект.
 * @return {any} Случайный элемент.
 */
export const getRandomElement = (iterableObject) => Array.from(iterableObject)[getRandomNumber(0, Array.from(iterableObject).length - 1)];

/**
 * Возвращает случайное логическое значение.
 *
 * @return {boolean} True or False.
 */
export const getRandomFlag = () => getRandomNumber(0, 1) ? true : false;

/**
 * Возвращает новый массив, перетасовывая значения итерируемый объекта в случайном порядке.
 *
 * @param {iterable} iterableObject - итерируемый объект.
 * @return {array} Перетасованный массив.
 */
export const shuffle = (iterableObject) => {
  let newArray = Array.from(iterableObject);
  newArray.forEach((element, index, arr) => {
    let randomIndex = getRandomNumber(0, arr.length - 1);
    [arr[randomIndex], arr[index]] = [arr[index], arr[randomIndex]];
  });
  return newArray;
};

/**
 * Возвращает DOM на основе разметки.
 *
 * @param {string} template - разметка.
 * @return {node} DOM разметки.
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/**
 * Вставляет элемент в определенную позицию контейнера.
 *
 * @param {node} container - контейнер.
 * @param {node} element - элемент.
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
  }
};

/**
 * Удалить DOM-элемент.
 *
 * @param {node} element - элемент.
 */
export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

/**
 * Сделать заглавной первую букву слова.
 *
 * @param {string} word - слово.
 * @return {string} - слово с заглавной первой буквой
 */
export const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const hideNode = (node) => {
  node.style.display = `none`;
};

export const showNode = (node) => {
  node.style.display = ``;
};
