import { SortKey } from 'domain/SortKey';
import * as Action from '../actions/sort';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  sortKey: string;
}

const initialState: State = {
  sortKey: SortKey.Updated
};

const reducer = reducerWithInitialState(initialState).case(
  Action.setSortKey,
  (state, payload) => {
    const { sortKey } = payload;
    if (sortKey !== undefined) {
      return {
        ...state,
        sortKey: payload.sortKey
      };
    }
    return state;
  }
);

export default reducer;
