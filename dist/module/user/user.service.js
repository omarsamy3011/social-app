"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../database/model/user.model"));
const friend_model_1 = __importDefault(require("../../database/model/friend.model"));
const friend_enum_1 = require("../../common/enums/friend.enum");
const database_reposatory_1 = require("../../database/reposatory/database.reposatory");
class UserService {
    friendReposatory;
    userReposatory;
    constructor() {
        this.friendReposatory = new database_reposatory_1.DatabaseReposatory(friend_model_1.default);
        this.userReposatory = new database_reposatory_1.DatabaseReposatory(user_model_1.default);
    }
    async getUserProfileWithFriends(userId) {
        const currentUser = await this.userReposatory.findById({ id: userId,
            populate: [{
                    path: 'groups'
                }]
        });
        const friendships = await friend_model_1.default
            .find({
            $or: [
                { sender: userId, status: friend_enum_1.FriendStatusEnum.ACCEPTED },
                { receiver: userId, status: friend_enum_1.FriendStatusEnum.ACCEPTED },
            ],
        })
            .populate('sender', '_id firstName lastName email profilepic')
            .populate('receiver', '_id firstName lastName email profilepic');
        const friends = friendships.map((f) => {
            const friendObj = f.sender._id.toString() === userId.toString() ? f.receiver : f.sender;
            return {
                _id: friendObj._id,
                username: `${friendObj.firstName || ''} ${friendObj.lastName || ''}`.trim(),
                email: friendObj.email,
                profilePicture: friendObj.profilepic,
            };
        });
        const pendingRequests = await friend_model_1.default
            .find({ receiver: userId, status: friend_enum_1.FriendStatusEnum.PENDING })
            .populate('sender', '_id firstName lastName email profilepic');
        const friendRequests = pendingRequests.map((req) => ({
            _id: req.sender._id,
            username: `${req.sender.firstName || ''} ${req.sender.lastName || ''}`.trim(),
            email: req.sender.email,
            profilePicture: req.sender.profilepic,
            groups: req.sender.groups
        }));
        return {
            user: {
                _id: currentUser?._id,
                username: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim(),
                email: currentUser?.email,
                profilePicture: currentUser?.profilepic,
                friends,
                friendRequests
            },
            groups: currentUser.groups
        };
    }
}
exports.default = new UserService();
