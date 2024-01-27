import config from '../shared/config.json';
import { useDispatch } from 'react-redux';
import { getAuthToken } from './amplify';

export async function createWebSocket() {
    try {
        const socket = new WebSocket(`${config.socketUrl}?auth=${await getAuthToken()}`);
        socket.onmessage = messageHandler;
        return socket;
    } catch (err) {
        console.log(err);
    }
}

function messageHandler(event: MessageEvent<any>) {
    console.log(event);
    const dispatch = useDispatch();
}
