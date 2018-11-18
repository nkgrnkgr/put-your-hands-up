export function showResult<T>(values: T): void {
  setTimeout(() => {
    window.alert(`values is ${JSON.stringify(values, null, '\t')}`);
  }, 1000);
}
