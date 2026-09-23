import { Document, Types } from 'mongoose';
import { FriendStatusEnum } from '../enums/friend.enum';

export interface IFriend {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  status: FriendStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
