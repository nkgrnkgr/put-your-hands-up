import * as v4 from 'uuid/v4';

export const createRandomId = (): string => {
  return v4();
};
