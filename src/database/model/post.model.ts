import mongoose, { Schema } from "mongoose";
import { IPost } from "../../common/interfaces/post.interface";
import userModel from "./user.model";


const postSchema = new mongoose.Schema<IPost>({
    title:{
        type:String},
    content:{
        type:String},
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    comments:{
        type:[String]},
    likes:{
        type:[String]},
    createdAt:{
        type:Date,
        default:null},
    editedAt:{
        type:Date,
        default:null}},
        {
            timestamps:true
        }
)

const postModel = mongoose.model<IPost>('post',postSchema)

export default postModel

