import * as Action from 'actions/confirmModal';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  isActive: boolean;
}

const initialState: State = {
  isActive: false
};

const reducer = reducerWithInitialState(initialState).case(
  Action.toggleDisplay,
  state => {
    return {
      ...state,
      isActive: !state.isActive
    };
  }
);

export default reducer;
