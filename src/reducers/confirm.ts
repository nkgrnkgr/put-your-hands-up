import * as Action from 'actions/confirmModal';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  okAction: () => void;
  ngAction: () => void;
}

const initialState: State = {
  okAction: () => {},
  ngAction: () => {}
};

const reducer = reducerWithInitialState(initialState)
  .case(Action.setOkAction, (state, payload) => {
    const { action } = payload;
    return {
      ...state,
      okAction: action
    };
  })
  .case(Action.setNgAction, (state, payload) => {
    const { action } = payload;
    return {
      ...state,
      ngAction: action
    };
  });

export default reducer;
