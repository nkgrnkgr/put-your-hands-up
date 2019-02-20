import * as CommentFormModalAction from 'actions/commentFormModal';
import * as ConfirmModalAction from 'actions/confirmModal';
import * as CommentAction from 'actions/comment';
import * as MobileMenuAction from 'actions/mobileMenu';
import * as TabAction from 'actions/tab';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  isActiveCommetFormModal: boolean;
  isActiveConfirmModal: boolean;
  isActiveCommentForm: boolean;
  isActiveMobileMenu: boolean;
  selectedTabIndex: number;
}

const initialState: State = {
  isActiveCommetFormModal: false,
  isActiveConfirmModal: false,
  isActiveCommentForm: false,
  isActiveMobileMenu: false,
  selectedTabIndex: 0
};

const reducer = reducerWithInitialState(initialState)
  .case(CommentFormModalAction.toggleDisplay, state => {
    return {
      ...state,
      isActiveCommetFormModal: !state.isActiveCommetFormModal
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
  })
  .case(CommentAction.changeStateCommentForm, (state, payload) => {
    const { shouldOpen } = payload;
    if (shouldOpen !== undefined) {
      return {
        ...state,
        isActiveCommentForm: shouldOpen
      };
    }
    return state;
  });

export default reducer;
