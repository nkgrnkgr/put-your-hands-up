import * as Action from 'actions/content';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  inputtingContent: string;
}

const initialState: State = {
  inputtingContent: ''
};

const reducer = reducerWithInitialState(initialState).case(
  Action.onChangeContent,
  (state, payload) => {
    const { inputtingContent } = payload;
    if (inputtingContent !== undefined) {
      return {
        ...state,
        inputtingContent
      };
    }
    return state;
  }
);
export default reducer;
