// src/database/model/friend.model.ts
import  mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { FriendStatusEnum } from '../../common/enums/friend.enum';
import './user.model';
import { IFriend } from '../../common/interfaces/friend.interface';



const friendSchema = new Schema<IFriend>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FriendStatusEnum),
      default: FriendStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

const friendModel = mongoose.model<IFriend>('Friend', friendSchema);

export default friendModel

