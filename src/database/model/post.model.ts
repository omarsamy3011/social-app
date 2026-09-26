import mongoose, { trusted, Types } from "mongoose";
import { IPost } from "../../common/interfaces/post.interface";
import userModel from "./user.model";
import { string } from "zod";
import { commentSchema } from "./comment.model";


const postSchema = new mongoose.Schema<IPost>({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String},
    attachments:[{
        type:String,
        required:function(this){
            return this.content.length == 0
        }
    }],
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:true
    },
    comments:[commentSchema],
    likes:[{
        type:Types.ObjectId,
        ref:'user'
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    editedAt:{
        type:Date,
        default:null}},
        {
            timestamps:true,
            toJSON:{virtuals:true},
            toObject:{virtuals:true}
        }
)

const postModel = mongoose.model<IPost>('post',postSchema)

export default postModel

