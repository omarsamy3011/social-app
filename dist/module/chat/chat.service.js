"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatservice = exports.chatService = void 0;
const mongoose_1 = require("mongoose");
const chat_model_1 = require("../../database/model/chat.model");
const database_reposatory_1 = require("../../database/reposatory/database.reposatory");
const error_exceptions_1 = require("../../common/exceptions/error.exceptions");
const chat_enum_1 = require("../../common/enums/chat.enum");
const user_model_1 = __importDefault(require("../../database/model/user.model"));
const crypto_1 = require("crypto");
class chatService {
    chatReposatory;
    userReposatory;
    constructor() {
        this.chatReposatory = new database_reposatory_1.DatabaseReposatory(chat_model_1.chatModel);
        this.userReposatory = new database_reposatory_1.DatabaseReposatory(user_model_1.default);
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
    async sendMessage(data, socket) {
        let { content, sendTo } = data;
        let sentFrom = socket.data.id;
        let chat = await this.chatReposatory.updateone({
            filter: {
                particepate: { $all: [new mongoose_1.Types.ObjectId(sentFrom),
                        new mongoose_1.Types.ObjectId(sendTo)] }
            },
            data: {
                $push: { message: {
                        content: content,
                        createdBy: new mongoose_1.Types.ObjectId(sentFrom)
                    } }
            }
        });
        if (!chat.modifiedCount) {
            let sender = new mongoose_1.Types.ObjectId(sentFrom);
            let reciever = new mongoose_1.Types.ObjectId(sendTo);
            const roomID = [sentFrom, sendTo].sort().join('_');
            let newChat = await this.chatReposatory.create({
                particepate: [sender, reciever],
                createdBy: sender,
                message: [{
                        content: content,
                        createdBy: sender,
                        attachments: []
                    }],
                type: chat_enum_1.ChatEnum.ovo,
                roomID: roomID
            });
            return newChat;
        }
        return chat;
    }
    async addGroup(userID, body) {
        let { particepate, group } = body;
        let paticepantIDs = [...new Set(particepate.map((ele) => {
                return new mongoose_1.Types.ObjectId(ele);
            }))];
        let foundPatricepants = await this.userReposatory.findall({
            filter: {
                _id: { $in: paticepantIDs },
                friends: { $in: [new mongoose_1.Types.ObjectId(userID)] }
            }
        });
        if (foundPatricepants.length != paticepantIDs.length) {
            throw new error_exceptions_1.BadRequestError('cannot form group chat due to some member is not in ur friend list');
        }
        let roomID = (0, crypto_1.randomUUID)();
        paticepantIDs.push(new mongoose_1.Types.ObjectId(userID));
        let groupChat = await this.chatReposatory.create({
            particepate: paticepantIDs,
            createdBy: new mongoose_1.Types.ObjectId(userID),
            roomID,
            group,
            type: chat_enum_1.ChatEnum.ovm,
            message: []
        });
        await this.userReposatory.updateMany({
            filter: { _id: { $in: paticepantIDs } },
            data: { $push: { groups: groupChat._id } }
        });
        return groupChat;
    }
    async getGroupChat(groupID, userID) {
        const chat = await this.chatReposatory.findone({
            filter: {
                _id: new mongoose_1.Types.ObjectId(groupID)
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
    async sendGroupMessage(data, socket) {
        let { content, groupId } = data;
        let sentFrom = socket.data.id;
        let chat = await this.chatReposatory.updateone({
            filter: {
                _id: new mongoose_1.Types.ObjectId(groupId)
            },
            data: {
                $push: { message: {
                        content: content,
                        createdBy: new mongoose_1.Types.ObjectId(sentFrom)
                    } }
            }
        });
        if (!chat.modifiedCount) {
            throw new error_exceptions_1.NotFoundError('Chat Not Found !!');
        }
        return await this.chatReposatory.findById({ id: groupId,
            select: 'particepate'
        });
    }
}
exports.chatService = chatService;
exports.chatservice = new chatService();
