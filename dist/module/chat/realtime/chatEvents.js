"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatEvent = void 0;
const chat_service_1 = require("../chat.service");
class chatEvent {
    chatservice;
    constructor() {
        this.chatservice = chat_service_1.chatservice;
    }
    addMessage(socket, io) {
        return socket.on('sendMessage', (data) => {
        });
    }
}
exports.chatEvent = chatEvent;
