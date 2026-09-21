"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const token_1 = require("../../common/service/token");
const error_exceptions_1 = require("../../common/exceptions/error.exceptions");
const realtimeChat_gateway_1 = require("../chat/realtime/realtimeChat.gateway");
class RealTimeGateWay {
    tokenservice;
    constructor() {
        this.tokenservice = new token_1.TokenService();
    }
    async authenticate(socket, next) {
        try {
            const tokenser = new token_1.TokenService();
            let decoded = tokenser.decodeToken(socket.handshake.auth.token);
            if (!decoded) {
                throw new error_exceptions_1.BadRequestError('1invalid token');
            }
            let userId = (typeof decoded === "object" && decoded.id) || undefined;
            socket.data = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    }
    initializer(httpServer) {
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*'
            }
        });
        io.use(this.authenticate);
        io.on('connection', (socket) => {
            console.log(`user connected and his id is ${socket.data.id}`);
            socket.on('disconnect', () => {
                console.log(`socket of id ${socket.id} is diconnected`);
            });
            socket.on('start', (data, callback) => {
                console.log(data);
                callback('recieved from start');
                io.emit('send', 'send from send');
            });
            realtimeChat_gateway_1.chatgateway.register(socket, io);
        });
    }
}
