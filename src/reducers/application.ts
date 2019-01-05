import * as ConfirmModalAction from 'actions/confirmModal';
import * as InputAction from 'actions/input';
import * as MobileMenuAction from 'actions/mobileMenu';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  isActiveConfirmModal: boolean;
  isActiveInputForm: boolean;
  isActiveMobileMenu: boolean;
}

const initialState: State = {
  isActiveConfirmModal: false,
  isActiveInputForm: false,
  isActiveMobileMenu: false
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
      isActiveConfirmModal: !state.isActiveConfirmModal
    };
  })
  .case(MobileMenuAction.toggleMobileMenu, state => {
    return {
      ...state,
      isActiveMobileMenu: !state.isActiveMobileMenu
    };
  });

export default reducer;
