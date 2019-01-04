import { actionCreatorFactory } from 'typescript-fsa';

export interface ConfirmModalActionPayload {
  action: () => void;
}

const actionCreater = actionCreatorFactory();

export const toggleDisplay = actionCreater('CONFIRM_MODAL_TOGGLE_DISPLAY');

export const setOkAction = actionCreater<ConfirmModalActionPayload>(
  'CONFIRM_MODAL_SET_OK_ACTION'
);

export const setNgAction = actionCreater<ConfirmModalActionPayload>(
  'CONFIRM_MODAL_SET_NG_ACTION'
);
