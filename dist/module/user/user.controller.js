"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_service_1 = __importDefault(require("./user.service"));
const successresponce_1 = require("../../common/exceptions/successresponce");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.auth, async (req, res) => {
    const userId = req.user.id;
    const data = await user_service_1.default.getUserProfileWithFriends(userId);
    return (0, successresponce_1.successResponce)({
        res,
        message: 'User data retrieved successfully',
        data,
    });
});
exports.default = router;
