import { includeString } from 'utils/Compare';

export default interface Tag {
  title: string;
  isFeatured: boolean;
}

export const isDuplicate = (tags: Tag[], target: Tag): boolean => {
  return tags.some((t, index) => {
    return includeString(t.title, target.title);
  });
};
