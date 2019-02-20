import { actionCreatorFactory } from 'typescript-fsa';

const actionCreater = actionCreatorFactory();

export const toggleDisplay = actionCreater('COMMENT_FORM_MODAL_TOGGLE_DISPLAY');
