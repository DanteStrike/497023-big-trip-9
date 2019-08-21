export const Enum = {
  MILLISECONDS_IN_SECOND: 1000,
  SECONDS_IN_MINUTE: 60,
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  MILLISECONDS_IN_MINUTE: 1000 * 60,
  MILLISECONDS_IN_HOUR: 1000 * 60 * 60,
  MILLISECONDS_IN_DAY: 1000 * 60 * 60 * 24
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

