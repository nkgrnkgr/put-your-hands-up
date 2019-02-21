import { isDuplicate } from './../domain/Tag';
import Tag from 'domain/Tag';
import * as Action from 'actions/search';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  query: string;
  tags: Tag[];
}

const initialState: State = {
  query: '',
  tags: []
};

const reducer = reducerWithInitialState(initialState)
  .case(Action.searchQuery, (state, payload) => {
    const { query } = payload;
    if (query !== undefined) {
      return {
        ...state,
        query
      };
    }
    return state;
  })
  .case(Action.addTag, (state, payload) => {
    const { tag } = payload;
    if (tag === undefined) {
      return state;
    }
    if (isDuplicate(state.tags, tag)) {
      return state;
    }
    return {
      ...state,
      tags: [...state.tags, tag]
    };
  })
  .case(Action.removeTag, (state, payload) => {
    const { index } = payload;
    if (index === undefined) {
      return state;
    }
    if (!state.tags[index]) {
      return state;
    }
    const t = [...state.tags];
    t.splice(index, 1);
    return {
      ...state,
      tags: t
    };
  });

export default reducer;
