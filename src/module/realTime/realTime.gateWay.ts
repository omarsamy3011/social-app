import { Server } from "socket.io";
import { TokenService } from "../../common/service/token";
import { BadRequestError } from "../../common/exceptions/error.exceptions";
import { chatgateway } from "../chat/realtime/realtimeChat.gateway";


class RealTimeGateWay {
    private tokenservice:TokenService
    constructor(){
        this.tokenservice = new TokenService()
    }

    async authenticate(socket:any,next:any){
        try {
            const tokenser = new TokenService()
            let decoded = tokenser.decodeToken(socket.handshake.auth.token)
            if(!decoded){
                throw new BadRequestError('1invalid token')
            }
            let userId = (typeof decoded === "object" && decoded.id) || undefined
            //put to redis ////////
            socket.data=decoded
            next()
        } catch (error) {
            next(error as Error)
        }
    }

    initializer(httpServer : any){
            const io = new Server(httpServer,{
        cors:{
            origin:'*'
        }
    })
    io.use(this.authenticate)
    io.on('connection',(socket)=>{
        console.log(`user connected and his id is ${socket.data.id}`);
        socket.on('disconnect',()=>{
        console.log(`socket of id ${socket.id} is diconnected`);
    })
    socket.on('start',(data,callback)=>{
        console.log(data)
        callback('recieved from start')
        io.emit('send','send from send')
    })
    chatgateway.register(socket,io)
    })
    }

}