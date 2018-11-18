import { Color } from 'react-color';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreater = actionCreatorFactory();

interface ContentActionPayload {
  inputtingContent?: string;
}

interface TagsActionPayload {
  inputtingTag?: string;
  index?: number;
  title?: string;
  isFeatured?: boolean;
}

interface ColorActionPayload {
  selectedColor?: Color;
}

export type InputActionPayload = ContentActionPayload &
  ColorActionPayload &
  TagsActionPayload;

export const onChangeContent = actionCreater<ContentActionPayload>(
  'CONTENT_ON_CHANGE'
);

export const addContent = actionCreater<ContentActionPayload>('CONTENT_ADD');

export const onChangeTagInput = actionCreater<TagsActionPayload>(
  'TAG_ON_CHANGE'
);

export const addTag = actionCreater<TagsActionPayload>('TAG_ADD');

export const removeTag = actionCreater<TagsActionPayload>('TAG_REMOVE');

export const onChangeColor = actionCreater<ColorActionPayload>(
  'COLOR_ON_CHANGE'
);

export const resetInput = actionCreater('INPUT_RESET');
