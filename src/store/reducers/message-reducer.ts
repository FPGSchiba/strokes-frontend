import { MessageActionTypes } from '../actions/message';
import { GET_MESSAGE_SUCCESS } from '../constants/message';
import { MessageState } from '../format';

const initialState: MessageState = {
    severity: 'error',
    messageTitle: 'Error',
    open: false,
    message: 'Loading...'
};

export default function message(state = initialState, action: MessageActionTypes): MessageState {
    switch (action.type) {
        case GET_MESSAGE_SUCCESS:
            return {
                ...state,
                severity: action.severity,
                messageTitle: action.messageTitle,
                open: action.open,
                message: action.message
            };
        default: return state;
    }
}
