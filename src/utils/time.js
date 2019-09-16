import {leadIntoTwoDigitView} from './utils.js';


export const formatDateTimeValue = (time) => {
  return `${leadIntoTwoDigitView(new Date(time).getDate())}/${leadIntoTwoDigitView(new Date(time).getMonth())}/${new Date(time).getFullYear()}T${leadIntoTwoDigitView(new Date(time).getHours())}:${leadIntoTwoDigitView(new Date(time).getMinutes())}`;
};

export const formatDateTime = (time) => {
  return `${new Date(time).getFullYear()}-${leadIntoTwoDigitView(new Date(time).getMonth())}-${leadIntoTwoDigitView(new Date(time).getDate())}T${leadIntoTwoDigitView(new Date(time).getHours())}:${leadIntoTwoDigitView(new Date(time).getMinutes())}`;
};

export const formatDateTimeView = (time) => {
  return `${leadIntoTwoDigitView(new Date(time).getHours())}:${leadIntoTwoDigitView(new Date(time).getMinutes())}`;
};

export const formatDateToMonthDay = (date) => {
  const monthIndex = 1;
  const dayIndex = 2;
  return new Date(date).toDateString()
    .split(` `)
    .slice(monthIndex, dayIndex + 1)
    .join(` `);
};
