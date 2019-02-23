import * as Action from 'actions/userSetting';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  inputtingName: string;
  selectingColorHex: string;
}

const initialState: State = {
  inputtingName: '',
  selectingColorHex: '#000000'
};

const reducer = reducerWithInitialState(initialState)
  .case(Action.onChangeName, (state, payload) => {
    const { name = state.inputtingName } = payload;
    return {
      ...state,
      inputtingName: name
    };
  })
  .case(Action.onSelectColorHex, (state, payload) => {
    const { hex = state.selectingColorHex } = payload;
    return {
      ...state,
      selectingColorHex: hex
    };
  });

export default reducer;
