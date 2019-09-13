/**
 * Сделать заглавной первую букву слова.
 *
 * @param {string} word - слово.
 * @return {string} - слово с заглавной первой буквой
 */
export const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const formatDateTimeValue = (time) => {
  return `${new Date(time).getDate()}/${new Date(time).getMonth()}/${new Date(time).getFullYear()} ${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
};

export const formatDateTime = (time) => {
  return `${new Date(time).getFullYear()}-${new Date(time).getMonth()}-${new Date(time).getDate()}T${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
};

export const formatDateTimeView = (time) => {
  return `${new Date(time).getHours() < 10 ? `0${new Date(time).getHours()}` : `${new Date(time).getHours()}`}:${new Date(time).getMinutes() < 10 ? `0${new Date(time).getMinutes()}` : `${new Date(time).getMinutes()}`}`;
};

export const formatDateToMonthDay = (date) => {
  return new Date(date).toDateString()
    .split(` `)
    .slice(1, 3)
    .join(` `);
};

export const toJSON = (response) => {
  return response.json();
};


export const getAuthToken = () => {
  const numberSystem = 36;

  return Math.random()
    .toString(numberSystem);
};
