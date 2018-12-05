import { actionCreatorFactory } from 'typescript-fsa';

export interface ConfirmModalActionPayload {
  isActive: boolean;
}

const actionCreater = actionCreatorFactory();

export const toggleDisplay = actionCreater('CONFIRM_MODAL_TOGGLE_DISPLAY');
