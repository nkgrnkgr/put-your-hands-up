export function createNewListFrom<T>(item: T, list: T[] | undefined): T[] {
  if (list === undefined) return [item];
  return [...list, item];
}
