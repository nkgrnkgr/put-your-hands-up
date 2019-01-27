import { actionCreatorFactory } from 'typescript-fsa';

const actionCreater = actionCreatorFactory();

export interface TabActionPayload {
  selectedTabIndex: number;
}

export const selectTab = actionCreater<TabActionPayload>('SELECT_TAB');
