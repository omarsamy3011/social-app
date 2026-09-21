"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatservice = exports.chatService = void 0;
const mongoose_1 = require("mongoose");
const chat_model_1 = require("../../database/model/chat.model");
const database_reposatory_1 = require("../../database/reposatory/database.reposatory");
const error_exceptions_1 = require("../../common/exceptions/error.exceptions");
class chatService {
    chatReposatory;
    constructor() {
        this.chatReposatory = new database_reposatory_1.DatabaseReposatory(chat_model_1.chatModel);
    }
    async getChat(particepantID, userID) {
        const chat = await this.chatReposatory.findone({
            filter: {
                particepate: {
                    $all: [new mongoose_1.Types.ObjectId(particepantID), new mongoose_1.Types.ObjectId(userID)]
                },
            },
            populate: [
                { path: 'particepate' }
            ]
        });
        if (!chat) {
            throw new error_exceptions_1.NotFoundError('no chat exist');
        }
        return chat;
    }
}
exports.chatService = chatService;
exports.chatservice = new chatService();
