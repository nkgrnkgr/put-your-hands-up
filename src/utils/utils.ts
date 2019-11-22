import v4 from 'uuid/v4';

export const createRandomId = (): string => {
  return v4();
};

export const uniq = <T>(array: T[], element: T) =>
  [...array, element].filter(
    (value, index, self) => self.indexOf(value) === index,
  );
