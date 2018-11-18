import { actionCreatorFactory } from 'typescript-fsa';

export interface TagsActionPayload {
  inputtingTag?: string;
  index?: number;
  title?: string;
  isFeatured?: boolean;
}

const actionCreater = actionCreatorFactory();

export const onChangeTagInput = actionCreater<TagsActionPayload>(
  'TAG_ON_CHANGE'
);

export const addTag = actionCreater<TagsActionPayload>('TAG_ADD');

export const removeTag = actionCreater<TagsActionPayload>('TAG_REMOVE');
