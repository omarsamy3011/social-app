import { Types } from "mongoose";
import { IChat } from "../../common/interfaces/chat.interface";
import { chatModel } from "../../database/model/chat.model";
import { DatabaseReposatory } from "../../database/reposatory/database.reposatory";
import { NotFoundError } from "../../common/exceptions/error.exceptions";



export class chatService{
    private chatReposatory : DatabaseReposatory<IChat>
    constructor(){
        this.chatReposatory = new DatabaseReposatory<IChat>(chatModel)
    }

    async getChat(particepantID:string,userID:string){
        const chat = await this.chatReposatory.findone({
            filter:{
                particepate:{
                    $all:[new Types.ObjectId(particepantID) ,new Types.ObjectId(userID)]
                },
            },
            populate:[
                {path:'particepate'}
            ]
        })
        if(!chat){
            throw new NotFoundError('no chat exist')
        }
        return chat
    }
}

export const chatservice = new chatService()