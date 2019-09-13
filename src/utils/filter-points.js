import {TimeValue, FilterType} from './enum';

export const filterPoints = (type, points) => {
  switch (type) {
    case FilterType.EVERYTHING:
      return points;

    case FilterType.FUTURE:
      return points.filter((point) => (Date.now() - point.time.start) < TimeValue.MILLISECONDS_IN_MINUTE);

    case FilterType.PAST:
      return points.filter((point) => (Date.now() - point.time.end) > TimeValue.MILLISECONDS_IN_MINUTE);
  }
  return null;
};
