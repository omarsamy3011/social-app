import { Types } from "mongoose";




export interface IPost {
    title:string,
    content:string,
    userId:Types.ObjectId,
    comments:string[],
    likes:string[],
    createdAt:Date,
    editedAt:Date
}