export const includeString = (target: string, query: string) => {
  return target.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
};
