import { actionCreatorFactory } from 'typescript-fsa';

const actionCreater = actionCreatorFactory();

export const toggleMobileMenu = actionCreater('MOBILE_MENU_TOGGLE_DISPLAY');
