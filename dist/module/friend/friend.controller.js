"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friend_service_1 = __importDefault(require("./friend.service"));
const successresponce_1 = require("../../common/exceptions/successresponce");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/request/:receiverId', auth_middleware_1.auth, async (req, res, next) => {
    try {
        const senderId = req.user.id;
        const recipientIdentifier = req.params.receiverId;
        const data = await friend_service_1.default.sendFriendRequest(senderId, recipientIdentifier);
        return (0, successresponce_1.successResponce)({
            res,
            message: 'Friend request sent successfully',
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
router.patch('/accept/:friendId', auth_middleware_1.auth, async (req, res, next) => {
    try {
        const receiverId = req.user.id;
        const friendId = req.params.friendId;
        const data = await friend_service_1.default.respondToRequest(receiverId, friendId, {
            action: 'accepted',
        });
        return (0, successresponce_1.successResponce)({
            res,
            message: 'Friend request accepted successfully',
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
router.patch('/reject/:friendId', auth_middleware_1.auth, async (req, res, next) => {
    try {
        const receiverId = req.user._id;
        const friendId = req.params.friendId;
        const data = await friend_service_1.default.respondToRequest(receiverId, friendId, {
            action: 'rejected',
        });
        return (0, successresponce_1.successResponce)({
            res,
            message: 'Friend request rejected successfully',
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
