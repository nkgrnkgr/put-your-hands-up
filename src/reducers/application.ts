import * as ConfirmModalAction from 'actions/confirmModal';
import * as InputAction from 'actions/input';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  isActiveConfirmModal: boolean;
  isActiveInputForm: boolean;
}

const initialState: State = {
  isActiveConfirmModal: false,
  isActiveInputForm: false
};

const reducer = reducerWithInitialState(initialState)
  .case(InputAction.toggleDisplay, state => {
    return {
      ...state,
      isActiveInputForm: !state.isActiveInputForm
    };
  })
  .case(ConfirmModalAction.toggleDisplay, state => {
    return {
      ...state,
      isActiveInputForm: !state.isActiveInputForm
    };
  });

export default reducer;
