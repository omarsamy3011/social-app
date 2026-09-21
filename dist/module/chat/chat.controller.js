"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const chat_service_1 = require("./chat.service");
const successresponce_1 = require("../../common/exceptions/successresponce");
const router = (0, express_1.Router)();
router.get('/:particepantID', auth_middleware_1.auth, async (req, res) => {
    const data = await chat_service_1.chatservice.getChat(req.params.particepantID, req.user.id);
    (0, successresponce_1.successResponce)({ res, message: 'chat accessed', data });
});
exports.default = router;
