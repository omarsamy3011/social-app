"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatEvent = void 0;
const chat_service_1 = require("../chat.service");
const redisService_1 = require("../../../common/service/redisService");
class chatEvent {
    chatservice;
    redisservice;
    constructor() {
        this.chatservice = chat_service_1.chatservice;
        this.redisservice = redisService_1.redisService;
    }
    addMessage(socket, io) {
        return socket.on('sendMessage', async (data, type) => {
            await this.chatservice.sendMessage(data, socket);
            let senderIDs = await this.redisservice.getUserSockets(socket.data.id);
            let recieverIDs = await this.redisservice.getUserSockets(data.sendTo);
            let broadcastIDs = [...senderIDs, ...recieverIDs];
            socket.emit("successMessage", data);
            if (recieverIDs.length) {
                io.to(recieverIDs).emit("newMessage", { content: data.content, from: socket.data.id });
            }
        });
    }
    addGroupMessage(socket, io) {
        return socket.on('sendGroupMessage', async (data, type) => {
            let chat = await this.chatservice.sendGroupMessage(data, socket);
            let objectIdArray = chat.particepate;
            const stringArray = objectIdArray.map((id) => id.toString());
            let particepantIDs = await this.redisservice.getUsersSockets(stringArray);
            socket.emit("successMessage", { content: data.content, sendTo: data.groupId });
            const recieverIDs = particepantIDs.filter(item => item !== socket.id);
            if (recieverIDs.length) {
                io.to(recieverIDs).emit("newMessage", { content: data.content, from: socket.data.id, groupId: data.groupId });
            }
        });
    }
}
exports.chatEvent = chatEvent;
