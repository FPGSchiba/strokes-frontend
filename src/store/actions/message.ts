import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../format';
import { ErrorResponse } from './shared';
import { GET_MESSAGE_SUCCESS } from '../constants/message';
import { OverridableStringUnion } from '@mui/types';
import { AlertColor, AlertPropsColorOverrides } from '@mui/material/Alert';

export interface GetMessageSuccessAction extends Action<typeof GET_MESSAGE_SUCCESS> {
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
    messageTitle: string;
    open: boolean;
    message: string;
}

export type MessageActionTypes =
    | GetMessageSuccessAction

type ThunkResult<R> = ThunkAction<R, AppState, undefined, MessageActionTypes>;

export function getUserSuccess(severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>, messageTitle: string, open: boolean, message: string): GetMessageSuccessAction {
    return {
        type: GET_MESSAGE_SUCCESS,
        severity,
        messageTitle,
        open,
        message
    };
}

export function postErrorMessage(message: string) {
    return async function (dispatch: (arg0: any) => void) {
        dispatch(getUserSuccess('error', 'Error', true, message));
    }
}

export function postWarningMessage(message: string) {
    return async function (dispatch: (arg0: any) => void) {
        dispatch(getUserSuccess('warning', 'Warning', true, message));
    }
}

export function postInfoMessage(message: string) {
    return async function (dispatch: (arg0: any) => void) {
        dispatch(getUserSuccess('info', 'Info', true, message));
    }
}

export function postSucccessMessage(message: string) {
    return async function (dispatch: (arg0: any) => void) {
        dispatch(getUserSuccess('success', 'Success', true, message));
    }
}

export function closeMessage(): ThunkResult<void> {
    return async function (dispatch: (arg0: any) => void) {
        dispatch(getUserSuccess('error', 'Error', false, 'Loading...'));
    }
}