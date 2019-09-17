import {TimeValue, FilterType} from './enum';


/**
 * Отфильтровать точки согласно установленному фильтру
 *
 * @param {string} type - тип фильтра.
 * @param {array} points - точки.
 * @return {array} - отфильтрованные точки.
 */
export const filterPoints = ({filterType: type, downloadedPoints: points}) => {
  switch (type) {
    case FilterType.EVERYTHING:
      return points;

    case FilterType.FUTURE:
      return points.filter((point) => (Date.now() - point.time.start) < TimeValue.MILLISECONDS_IN_MINUTE);

    case FilterType.PAST:
      return points.filter((point) => (Date.now() - point.time.end) > TimeValue.MILLISECONDS_IN_MINUTE);
  }
  return [];
};
