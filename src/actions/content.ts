import { actionCreatorFactory } from 'typescript-fsa';

export interface ContentActionPayload {
  inputtingContent?: string;
}

const actionCreater = actionCreatorFactory();

export const onChangeContent = actionCreater<ContentActionPayload>(
  'CONTENT_ON_CHANGE'
);
