import { LoginUser } from 'domain/LoginUser';
import * as Action from 'actions/login';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  loginUser: LoginUser;
}

const initialState: State = {
  loginUser: {
    displayName: 'unknown',
    uid: 'xxxx',
    photoURL: 'https://bulma.io/images/placeholders/128x128.png'
  }
};

const applicationReducer = reducerWithInitialState(initialState)
  .case(Action.login, (state, payload) => {
    const { loginUser } = payload;
    if (loginUser) {
      return {
        ...state,
        loginUser
      };
    }
    return state;
  })
  .case(Action.logout, state => {
    return {
      ...state,
      loginUser: initialState.loginUser
    };
  });

export default applicationReducer;
