"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const successresponce_1 = require("../../common/exceptions/successresponce");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const checkRole_middleware_1 = require("../../middleware/checkRole.middleware");
const cloud_1 = require("../../common/utils/multer/cloud");
const common_1 = require("../../common");
const validation_1 = require("../../common/service/validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post('/signup', (0, cloud_1.uploadFile)({ storageType: common_1.MulterStorageEnums.diskStorage }).single('file'), (0, validation_1.validation)(auth_validation_1.signupSchema), async (req, res) => {
    let data = await auth_service_1.default.signup(req.body, req.file);
    (0, successresponce_1.successResponce)({ res, message: 'signned up successfully', data: data });
});
router.get('/getS3URL/:name', async (req, res) => {
    let data = await auth_service_1.default.gets3url(req.params.name);
    (0, successresponce_1.successResponce)({ res, message: 'url created successfully', data: data });
});
router.post('/login', async (req, res) => {
    let data = await auth_service_1.default.login(req.body);
    (0, successresponce_1.successResponce)({ res, message: 'logged in successfully', data: data });
});
router.post('/verify-acc', async (req, res) => {
    let data = await auth_service_1.default.verify(req.body);
    (0, successresponce_1.successResponce)({ res, message: 'account veryfied successfully', data: data });
});
router.post('/verify', auth_middleware_1.auth, (0, checkRole_middleware_1.checkRole)(['1', '0']), async (req, res) => {
    (0, successresponce_1.successResponce)({ res, message: 'logged in successfully' });
});
exports.default = router;
