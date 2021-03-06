import { v4 } from 'uuid';

export const createRandomId = (): string => {
  return v4();
};

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const uniq = <T>(array: T[], element: T) =>
  [...array, element].filter(
    (value, index, self) => self.indexOf(value) === index,
  );
