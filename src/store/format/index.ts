import { CognitoUser } from 'amazon-cognito-identity-js';
import { OverridableStringUnion } from '@mui/types';
import { AlertColor, AlertPropsColorOverrides } from '@mui/material/Alert';

export interface AppState {
    userState: UserState;
    messageState: MessageState;
}


export interface MessageState {
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
    messageTitle: string;
    open: boolean;
    message: string;
}

export interface UserState {
    user: CognitoUser | null;
    loggedIn: boolean;
}
