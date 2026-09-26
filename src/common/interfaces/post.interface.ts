import { Types } from "mongoose";




export interface IPost {
    title:string,
    attachments?: string[],
    content:string,
    createdBy:Types.ObjectId,
    comments?:object[],
    likes?:Types.ObjectId[],
    createdAt?:Date,
    editedAt?:Date
}