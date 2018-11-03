import 'dayjs/locale/ja';
import * as dayjs from 'dayjs';

export const getYear = (dateTime: number): string => {
  return get(dateTime, 'YYYY');
};

export const getMonth = (dateTime: number): string => {
  return get(dateTime, 'MM');
};

export const getDay = (dateTime: number): string => {
  return get(dateTime, 'DD');
};

export const getHour = (dateTime: number): string => {
  return get(dateTime, 'HH');
};

export const getMinute = (dateTime: number): string => {
  return get(dateTime, 'mm');
};

export const getSecond = (dateTime: number): string => {
  return get(dateTime, 'ss');
};

export const getHourMinute = (dateTime: number): string => {
  return get(dateTime, 'HH:mm');
};

export const getYearMonth = (dateTime: number): string => {
  return get(dateTime, 'YYYY/MM/DD');
};

export const newDateTimeValue = (
  dateTime: number,
  unit: dayjs.UnitType,
  value: number
): number => {
  const d1 = dayjs(dateTime)
    .locale('ja')
    .set(unit, value);
  return d1.valueOf();
};

export const increment = (
  dateTime: number,
  value: number,
  unit: dayjs.UnitType
): number => {
  return dayjs(dateTime)
    .add(value, unit)
    .valueOf();
};

export const decrement = (
  dateTime: number,
  value: number,
  unit: dayjs.UnitType
): number => {
  return dayjs(dateTime)
    .subtract(value, unit)
    .valueOf();
};

export const ago = (dateTime: number, unit: dayjs.UnitType) => {
  const now = dayjs();
  const ago = dayjs(dateTime);
  return now.diff(ago, unit);
};

const get = (dateTime: number, format: string): string => {
  return dayjs(dateTime)
    .locale('ja')
    .format(format);
};
