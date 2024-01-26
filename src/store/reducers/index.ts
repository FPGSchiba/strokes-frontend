import { combineReducers } from 'redux';
import user from './user-reducer';
import message from './message-reducer';

export default combineReducers({ userState: user, messageState: message });
