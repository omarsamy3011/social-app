"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondValidation = void 0;
const friend_dto_1 = require("./dto/friend.dto");
exports.respondValidation = {
    body: friend_dto_1.respondRequestSchema,
};
