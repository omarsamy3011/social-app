"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realTimeGateway = void 0;
const socket_io_1 = require("socket.io");
const token_1 = require("../../common/service/token");
const error_exceptions_1 = require("../../common/exceptions/error.exceptions");
const realtimeChat_gateway_1 = require("../chat/realtime/realtimeChat.gateway");
const redisService_1 = require("../../common/service/redisService");
class RealTimeGateWay {
    tokenservice;
    redisservice;
    constructor() {
        this.tokenservice = new token_1.TokenService();
        this.redisservice = redisService_1.redisService;
    }
    authenticate = async (socket, next) => {
        try {
            const rawToken = socket.handshake.auth?.token;
            if (!rawToken) {
                return next(new error_exceptions_1.BadRequestError('Authentication token missing'));
            }
            const token = rawToken.startsWith('Bearer ')
                ? rawToken.slice(7)
                : rawToken;
            const decoded = this.tokenservice.decodeToken(token);
            if (!decoded) {
                return next(new error_exceptions_1.BadRequestError('Invalid token'));
            }
            socket.data = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    };
    initializer(httpServer) {
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*',
            },
        });
        io.use(this.authenticate);
        io.on('connection', async (socket) => {
            console.log(`User connected with ID: ${socket.data.id || socket.data._id}`);
            await this.redisservice.addSocket(socket.data.id, socket.id);
            socket.on('disconnect', async () => {
                console.log(`Socket disconnected: ${socket.id}`);
                await this.redisservice.removeSocket(socket.data.id, socket.id);
            });
            socket.on('start', (data, callback) => {
                console.log(data);
                if (typeof callback === 'function') {
                    callback('received from start');
                }
                io.emit('send', 'send from send');
            });
            realtimeChat_gateway_1.chatgateway.register(socket, io);
        });
    }
}
exports.realTimeGateway = new RealTimeGateWay();
