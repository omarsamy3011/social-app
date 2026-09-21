import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ChatEnum } from "../enums/chat.enum";


export interface IMessage {
    content : string,
    attachments:string[],
    likes:Types.ObjectId[] | IUser[],
    tags:Types.ObjectId[] | IUser[],
    createdBy:Types.ObjectId | IUser
    createdAt:Date,
    editedAt:Date,
    deletedAt:Date,
    restoredAt:Date
}


export interface IChat {
    particepate:Types.ObjectId[] | IUser[],
    createdBy:Types.ObjectId | IUser,
    message:IMessage[],
    type:ChatEnum,
    group:string,
    groupImage:string,
    roomID:string,
    createdAt:Date,
    editedAt:Date,
    deletedAt:Date,
    restoredAt:Date
}