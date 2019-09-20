import {leadIntoTwoDigitView} from './utils.js';

/**
 * Привести время в формат 'YYYY-MM-DDThh:mm'.
 *
 * @param {number} time - примитивное значение времени.
 * @return {string} - строковое представление 'YYYY-MM-DDThh:mm'.
 */
export const formatDateTime = (time) => {
  return `${new Date(time).getFullYear()}-${leadIntoTwoDigitView(new Date(time).getMonth())}-${leadIntoTwoDigitView(new Date(time).getDate())}T${leadIntoTwoDigitView(new Date(time).getHours())}:${leadIntoTwoDigitView(new Date(time).getMinutes())}`;
};

/**
 * Привести время в формат 'hh:mm'.
 *
 * @param {number} time - примитивное значение времени.
 * @return {string} - строковое представление 'hh:mm'.
 */
export const formatDateTimeView = (time) => {
  return `${leadIntoTwoDigitView(new Date(time).getHours())}:${leadIntoTwoDigitView(new Date(time).getMinutes())}`;
};

/**
 * Привести время в формат 'DD MMM'.
 *
 * @param {number} date - примитивное значение времени.
 * @return {string} - строковое представление 'DD MMM'.
 */
export const formatDateToMonthDay = (date) => {
  const splittedDate = new Date(date).toDateString().split(` `);
  const monthIndex = 1;
  const dayIndex = 2;
  return `${splittedDate[dayIndex]} ${splittedDate[monthIndex]}`;
};
