import { actionCreatorFactory } from 'typescript-fsa';

const actionCreater = actionCreatorFactory();

export interface SortActionPayload {
  sortKey: string;
}

export const setSortKey = actionCreater<SortActionPayload>('SET_SORTKEY');
