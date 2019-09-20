/**
 * Сделать заглавной первую букву слова.
 *
 * @param {string} word - слово.
 * @return {string} - слово с заглавной первой буквой.
 */
export const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

/**
 * Привести число в двузначный вид.
 *
 * @param {number} value - число.
 * @return {string} - строковое представление числа в двузначном виде.
 */
export const leadIntoTwoDigitView = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

/**
 * Конвертировать тело запроса в формат json.
 *
 * @param {Response} response - запрос с сервера.
 * @return {json} - данные в формате json.
 */
export const toJSON = (response) => {
  return response.json();
};

/**
 * Сформировать случайный токен авторизации.
 *
 * @return {string} - токен авторизации.
 */
export const getAuthToken = () => {
  const numberSystem = 36;
  return Math.random()
    .toString(numberSystem);
};
