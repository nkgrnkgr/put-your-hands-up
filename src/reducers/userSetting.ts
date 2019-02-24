import * as Action from 'actions/userSetting';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  inputtingName: string;
  selectingColorHex: string;
  inputtingTwitterId: string;
  inputtingDeleteMe: string;
}

const initialState: State = {
  inputtingName: '',
  selectingColorHex: '#000000',
  inputtingTwitterId: '',
  inputtingDeleteMe: ''
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
  })
  .case(Action.onChangeTwitterId, (state, payload) => {
    const { twitterId = state.inputtingTwitterId } = payload;
    return {
      ...state,
      inputtingTwitterId: twitterId
    };
  })
  .case(Action.onChangeDeleteMe, (state, payload) => {
    const { deleteMe = state.inputtingDeleteMe } = payload;
    return {
      ...state,
      inputtingDeleteMe: deleteMe
    };
  });

export default reducer;
