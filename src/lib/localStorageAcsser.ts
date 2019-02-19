export function save<T>(key: string, t: T) {
  localStorage.setItem(key, JSON.stringify(t));
}

export function find<T>(key: string): T | null {
  if (typeof key !== 'string') {
    throw new TypeError('not type of string');
  }
  const value = localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : null;
}

export function remove(key: string) {
  if (find(key) === null) {
    throw new Error('cannot find object.');
  }
  localStorage.removeItem(key);
}
