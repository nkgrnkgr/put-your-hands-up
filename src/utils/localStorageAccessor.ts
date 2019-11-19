export const save = <T>(key: string, t: T): void => {
  localStorage.setItem(key, JSON.stringify(t));
};

export const find = <T>(key: string): T | null => {
  if (typeof key !== 'string') {
    throw new TypeError('not type of string');
  }
  const value = localStorage.getItem(key);

  return value !== null ? JSON.parse(value) : null;
};

export const remove = (key: string) => {
  if (find(key) === null) {
    throw new Error('cannot find object.');
  }
  localStorage.removeItem(key);
};
