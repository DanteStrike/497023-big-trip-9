/**
 * Сделать заглавной первую букву слова.
 *
 * @param {string} word - слово.
 * @return {string} - слово с заглавной первой буквой
 */
export const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const leadIntoTwoDigitView = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const toJSON = (response) => {
  return response.json();
};

export const getAuthToken = () => {
  const numberSystem = 36;
  return Math.random()
    .toString(numberSystem);
};
