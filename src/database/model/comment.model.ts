import mongoose, { Types } from "mongoose";
import { IComment } from "../../common/interfaces/comment.interface";

export const commentSchema = new mongoose.Schema<IComment>({
    content: {
        type: String,
        required: true,
    },
    postId: {
        type: Types.ObjectId,
        ref: 'post',
        required: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:null
    }
    },
    { timestamps: true }
);

const commentModel = mongoose.model<IComment>('comment', commentSchema);

export default commentModel;