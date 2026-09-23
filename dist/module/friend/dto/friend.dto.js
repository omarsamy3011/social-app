"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondRequestSchema = void 0;
const zod_1 = require("zod");
const friend_enum_1 = require("../../../common/enums/friend.enum");
exports.respondRequestSchema = zod_1.z.object({
    action: zod_1.z.enum([friend_enum_1.FriendStatusEnum.ACCEPTED, friend_enum_1.FriendStatusEnum.REJECTED], {
        message: "Action must be either 'accepted' or 'rejected'",
    }),
});
