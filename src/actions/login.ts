import { LoginUser } from 'domain/LoginUser';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreater = actionCreatorFactory();

export interface LoginActionPayload {
  loginUser: LoginUser;
}

export const login = actionCreater<LoginActionPayload>('LOGIN_LOGIN');

export const logout = actionCreater('LOGIN_LOGOUT');
