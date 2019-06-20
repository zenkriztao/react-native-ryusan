import { Record } from "immutable";
import { WEB_SOCKET_URL } from "../config";
import * as actionTypes from "../redux/actionTypes";

import ApplicationService from "./ApplicationService";

const MessageRecord = Record({
    type: null,
    payload: {}
});

const ALLOWED_WEBSOCKET_ACTION_TYPES = [
    actionTypes.JOIN_QUIZ_INFO,
    actionTypes.JOIN_QUIZ_REJECT,
    actionTypes.JOIN_QUIZ_WAIT,
    actionTypes.START_QUIZ_SUCCESS,
    actionTypes.FINISH_QUIZ_SUCCESS,
    actionTypes.SOMEONE_JOINED_QUIZ,
    actionTypes.SOMEONE_LEFT_QUIZ,
    actionTypes.INCOMING_QUESTION,
    actionTypes.ANSWER_QUESTION_SUCCESS,
    actionTypes.JWT_AUTHENTICATION_ERROR
];

let _webSocketService = null;

class WebSocketService {
    constructor() {
        this.reconnectInterval = null;
        this.activeConnection = null;
        this.dispatchAction = null;
        this.isConnected = false;

        this.webSocketMiddleware = this.webSocketMiddleware.bind(this);

        this.connect();
        this.retry();
    }

    webSocketMiddleware({ dispatch }) {
        this.setDispatchAction(dispatch);

        return next => action => {
            if (action.webSocketAction) {
                this.send({
                    type: action.type,
                    payload: action.payload
                });
            }
            next(action);
        };
    }

    setDispatchAction(dispatch) {
        this.dispatchAction = dispatch;
    }

    setActiveConnection(activeConnection) {
        this.activeConnection = activeConnection;
    }

    decodeMessage(msg) {
        let message = {};

        try {
            message = JSON.parse(msg);
        } catch (err) {
            console.log(err);
        }

        return new MessageRecord(message);
    }

    parseMessage(msg) {
        const message = this.decodeMessage(msg);

        if (!ALLOWED_WEBSOCKET_ACTION_TYPES.includes(message.get("type"))) {
            return;
        }

        this.dispatchAction({
            type: message.get("type"),
            payload: message.get("payload")
        });
    }

    send(msg = {}) {
        if (this.activeConnection && this.isConnected) {
            const msgString = JSON.stringify({
                ...msg,
                token: ApplicationService.getUserToken()
            });

            return this.activeConnection.send(msgString);
        }
    }

    connect() {
        this.setActiveConnection(new WebSocket(WEB_SOCKET_URL));

        this.activeConnection.onopen = () => {
            this.isConnected = true;
            this.activeConnection.onmessage = event => {
                this.parseMessage(event.data);
                console.info("WebSocketService:", event.data);
            };
            console.info("WebSocketService: Connected");
        };

        this.activeConnection.onclose = () => {
            this.disconnect();
        };

        this.activeConnection.onerror = () => {
            this.disconnect();
        };
    }

    retry() {
        this.reconnectInterval = setInterval(() => {
            if (this.isConnected) {
                return;
            }

            console.log("WebSocketService: Connecting...");
            this.connect();
        }, 1000);
    }

    disconnect() {
        if (!this.isConnected) {
            return;
        }

        this.isConnected = false;
        this.activeConnection.close();
        console.log("WebSocketService: Disconnected");
    }
}

_webSocketService = new WebSocketService();

const webSocketMiddleware = _webSocketService.webSocketMiddleware;

export { webSocketMiddleware };

export default _webSocketService;
