"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = __importDefault(require("helmet"));
const env_service_1 = require("./config/env.service");
const connection_1 = require("./database/connection");
const errorHandling_1 = require("./middleware/errorHandling");
const util_1 = require("util");
const stream_1 = require("stream");
const s3service_1 = require("./common/service/s3service");
const redisService_1 = require("./common/service/redisService");
const express_2 = require("graphql-http/lib/use/express");
const index_1 = require("./module/gql/index");
const chat_controller_1 = __importDefault(require("./module/chat/chat.controller"));
const bootstrap = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get('/check-health', (req, res) => {
        res.json({ state: 'good' });
    });
    app.use((0, cors_1.default)({
        origin: '*'
    }));
    const limiter = (0, express_rate_limit_1.rateLimit)({
        windowMs: 10 * 60 * 1000,
        limit: 100
    });
    const S3GetFile = (0, util_1.promisify)(stream_1.pipeline);
    app.get('/uploads/*path', async (req, res) => {
        let { path } = req.params;
        let key = path.join('/');
        let { Body, ContentType } = await s3service_1.s3service.getFileFromBucket({ key });
        await S3GetFile(Body, res);
    });
    app.use(limiter);
    app.use((0, helmet_1.default)());
    app.use('/auth', auth_controller_1.default);
    app.use('/chat', chat_controller_1.default);
    (0, connection_1.dbconnection)();
    await redisService_1.redisService.connectRedis();
    app.all('/graphQL', (0, express_2.createHandler)({ schema: index_1.schema, context: (req) => ({ req }) }));
    app.use(errorHandling_1.globalErrorHandling);
    const httpserver = app.listen(env_service_1.env.port, () => {
        console.log(`server running on port ${env_service_1.env.port}`);
    });
};
exports.bootstrap = bootstrap;
