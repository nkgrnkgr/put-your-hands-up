import { actionCreatorFactory } from 'typescript-fsa';
import Tag from 'domain/Tag';

const actionCreater = actionCreatorFactory();

export interface SearchActionPayload {
  query?: string;
  tag?: Tag;
  index?: number;
}

export const searchQuery = actionCreater<SearchActionPayload>('SEARCH_QUERY');

export const addTag = actionCreater<SearchActionPayload>('SEARCH_ADD_TAG');

export const removeTag = actionCreater<SearchActionPayload>(
  'SEARCH_REMOVE_TAG'
);
