import { Socket } from 'socket.io'
import {chatservice,chatService} from '../chat.service'

export class chatEvent {
    private chatservice : chatService
    constructor(){
        this.chatservice = chatservice
    }

    addMessage(socket:any,io:any){
        return socket.on('sendMessage',(data:any)=>{
        })
    }
}
