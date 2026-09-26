import  { Types } from 'mongoose';


export interface IComment {
    content: string
    postId: Types.ObjectId
    createdBy: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}