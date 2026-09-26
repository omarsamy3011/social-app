import { Types } from "mongoose";
import { IComment } from "./comment.interface";


export interface IPost {
    title:string,
    attachments?: string[],
    content:string,
    createdBy:Types.ObjectId,
    comments?:IComment[],
    likes?:Types.ObjectId[],
    createdAt?:Date,
    editedAt?:Date
}