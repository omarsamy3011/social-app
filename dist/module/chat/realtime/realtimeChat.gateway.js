"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatgateway = void 0;
const chatEvents_1 = require("./chatEvents");
class chatGateWay {
    chatevent;
    constructor() {
        this.chatevent = new chatEvents_1.chatEvent();
    }
    register(socket, io) {
        this.chatevent.addMessage(socket, io);
        this.chatevent.addGroupMessage(socket, io);
    }
}
exports.chatgateway = new chatGateWay();
