export function createSetFrom<T>(item: T, list: T[] | undefined): T[] {
  if (list === undefined) return [item];
  if (list.indexOf(item) > -1) return list;
  return [...list, item];
}
