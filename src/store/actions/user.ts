import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GET_USER_SUCCESS } from '../constants/user';
import { AppState } from '../format';
import { ErrorResponse } from './shared';
import { handleSignOut, handleSignIn } from '../../services/amplify';
import { AuthSession } from '@aws-amplify/core/dist/esm/singleton/Auth/types';

export interface GetUserSuccessAction extends Action<typeof GET_USER_SUCCESS> {
  user: AuthSession | undefined;
}

export type UserActionTypes =
  | GetUserSuccessAction

type ThunkResult<R> = ThunkAction<R, AppState, undefined, UserActionTypes>;

export function getUserSuccess(user: AuthSession | undefined): GetUserSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    user
  };
}

export function doLogin(
  username: string,
  password: string,
  callback: (
    err?: ErrorResponse,
    user?: AuthSession,
  ) => void,
): ThunkResult<void> {
  return async function (dispatch: (arg0: any) => void) {
    try {
      const user = await handleSignIn(username, password);
      dispatch(getUserSuccess(user));
      callback(null, user);
    } catch (err: any) {
      const error = err.response?.data || err;
      callback(error);
    }
  };
}

export function doSignOut(callback: (err?: ErrorResponse) => void): ThunkResult<void> {
  return async function (dispatch: (arg0: any) => void) {
    try {
      handleSignOut()
      dispatch(getUserSuccess(undefined));
      callback(null);
    } catch (err: any) {
      const error = err.response?.data || err;
      callback(error);
    }
  };
}
