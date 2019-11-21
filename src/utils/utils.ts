export const uniq = <T>(array: T[], element: T) =>
  [...array, element].filter(
    (value, index, self) => self.indexOf(value) === index,
  );
