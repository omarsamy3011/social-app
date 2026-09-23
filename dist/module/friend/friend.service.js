"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("../../database/model/user.model"));
const friend_model_1 = __importDefault(require("../../database/model/friend.model"));
const friend_enum_1 = require("../../common/enums/friend.enum");
const error_exceptions_1 = require("../../common/exceptions/error.exceptions");
const database_reposatory_1 = require("../../database/reposatory/database.reposatory");
class FriendService {
    friendReposatory;
    userReposatory;
    constructor() {
        this.friendReposatory = new database_reposatory_1.DatabaseReposatory(friend_model_1.default);
        this.userReposatory = new database_reposatory_1.DatabaseReposatory(user_model_1.default);
    }
    async sendFriendRequest(senderId, recipientIdentifier) {
        let receiver;
        if (mongoose_1.Types.ObjectId.isValid(recipientIdentifier)) {
            receiver = await this.userReposatory.findById({ id: recipientIdentifier });
        }
        if (!receiver) {
            receiver = await this.userReposatory.findone({ filter: { email: recipientIdentifier.toLowerCase().trim() } });
        }
        if (!receiver) {
            throw new error_exceptions_1.NotFoundError('User not found with the provided ID or Email');
        }
        const receiverId = receiver._id.toString();
        if (senderId === receiverId) {
            throw new error_exceptions_1.BadRequestError('You cannot send a friend request to yourself');
        }
        const existingFriendship = await friend_model_1.default.findOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        });
        if (existingFriendship) {
            if (existingFriendship.status === friend_enum_1.FriendStatusEnum.ACCEPTED) {
                throw new error_exceptions_1.BadRequestError('You are already friends');
            }
            throw new error_exceptions_1.BadRequestError('A friend request is already pending between you two');
        }
        const newRequest = await this.friendReposatory.create({
            sender: new mongoose_1.Types.ObjectId(senderId),
            receiver: new mongoose_1.Types.ObjectId(receiverId),
            status: friend_enum_1.FriendStatusEnum.PENDING,
        });
        return newRequest;
    }
    async respondToRequest(userId, friendId, payload) {
        let friendship = await this.friendReposatory.findone({ filter: {
                sender: new mongoose_1.Types.ObjectId(friendId),
                receiver: new mongoose_1.Types.ObjectId(userId),
                status: friend_enum_1.FriendStatusEnum.PENDING,
            }
        });
        if (!friendship) {
            throw new error_exceptions_1.NotFoundError('Pending friend request not found');
        }
        if (payload.action === 'accepted') {
            friendship.status = friend_enum_1.FriendStatusEnum.ACCEPTED;
            await friendship.save();
        }
        else if (payload.action === 'rejected') {
            await this.friendReposatory.deleteone({ filter: { _id: friendship._id } });
            return { message: 'Friend request removed' };
        }
        else {
            throw new error_exceptions_1.BadRequestError('Invalid action type');
        }
        let user = await this.userReposatory.updateone({
            filter: {
                _id: new mongoose_1.Types.ObjectId(userId)
            },
            data: {
                $addToSet: { friends: new mongoose_1.Types.ObjectId(friendId) }
            }
        });
        let friend = await this.userReposatory.updateone({
            filter: {
                _id: new mongoose_1.Types.ObjectId(friendId)
            },
            data: {
                $addToSet: { friends: new mongoose_1.Types.ObjectId(userId) }
            }
        });
        return friendship;
    }
}
exports.default = new FriendService();
