import * as ConfirmModalAction from 'actions/confirmModal';
import * as InputAction from 'actions/input';
import * as MobileMenuAction from 'actions/mobileMenu';
import * as TabAction from 'actions/tab';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  isActiveConfirmModal: boolean;
  isActiveInputForm: boolean;
  isActiveMobileMenu: boolean;
  selectedTabIndex: number;
}

const initialState: State = {
  isActiveConfirmModal: false,
  isActiveInputForm: false,
  isActiveMobileMenu: false,
  selectedTabIndex: 0
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
  })
  .case(TabAction.selectTab, (state, payload) => {
    return {
      ...state,
      selectedTabIndex: payload.selectedTabIndex
    };
  });

export default reducer;
