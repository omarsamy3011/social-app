import mongoose, { Types } from 'mongoose';
import userModel from '../../database/model/user.model';
import friendModel from '../../database/model/friend.model';
import { FriendStatusEnum } from '../../common/enums/friend.enum';
import { BadRequestError, NotFoundError } from '../../common/exceptions/error.exceptions';
import { DatabaseReposatory } from '../../database/reposatory/database.reposatory';
import { IFriend } from '../../common/interfaces/friend.interface';
import { IUser } from '../../common';

class FriendService {
  private friendReposatory : DatabaseReposatory<IFriend>
  private userReposatory : DatabaseReposatory<IUser>
  constructor(){
    this.friendReposatory = new DatabaseReposatory<IFriend>(friendModel)
    this.userReposatory = new DatabaseReposatory<IUser>(userModel)
  }

  async sendFriendRequest(senderId: string, recipientIdentifier: string) {
    let receiver;
    // 1. Check if recipientIdentifier is a valid MongoDB ObjectId
    if (Types.ObjectId.isValid(recipientIdentifier)) {
      receiver = await this.userReposatory.findById({id:recipientIdentifier});
    }
    // 2. If not found by ID, look up by email address
    if (!receiver) {
      receiver = await this.userReposatory.findone({filter:{ email: recipientIdentifier.toLowerCase().trim()} });
    }
    if (!receiver) {
      throw new NotFoundError('User not found with the provided ID or Email');
    }

    const receiverId = receiver._id.toString();

    // 3. Prevent sending request to oneself
    if (senderId === receiverId) {
      throw new BadRequestError('You cannot send a friend request to yourself');
    }

    // 4. Check if request or friendship already exists
    const existingFriendship = await friendModel.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existingFriendship) {
      if (existingFriendship.status === FriendStatusEnum.ACCEPTED) {
        throw new BadRequestError('You are already friends');
      }
      throw new BadRequestError('A friend request is already pending between you two');
    }

    // 5. Create new friend request
    const newRequest = await this.friendReposatory.create({
      sender: new Types.ObjectId(senderId),
      receiver: new Types.ObjectId(receiverId),
      status: FriendStatusEnum.PENDING,
    });

    return newRequest;
  }

  /**
   * Respond to a pending friend request (Accept or Reject)
   */
  async respondToRequest(
    userId: string,
    friendId: string,
    payload: { action: 'accepted' | 'rejected' }
  ) {

  let friendship = await this.friendReposatory.findone({filter:{
        sender: new Types.ObjectId(friendId),
        receiver: new Types.ObjectId(userId),
        status: FriendStatusEnum.PENDING,}
      })

    if (!friendship) {
      throw new NotFoundError('Pending friend request not found');
    }

    // 2. Update status according to action
    if (payload.action === 'accepted') {
      friendship.status = FriendStatusEnum.ACCEPTED;
      await friendship.save();
    } else if (payload.action === 'rejected') {
      await this.friendReposatory.deleteone({ filter:{_id: friendship._id} });
      return { message: 'Friend request removed' };
    } else {
      throw new BadRequestError('Invalid action type');
    }

    //add the friend in user friend array
    let user = await this.userReposatory.updateone({
      filter:{
        _id: new Types.ObjectId(userId)
      },
      data:{
        $addToSet:{ friends :new Types.ObjectId(friendId)}
      }
    })    
    let friend = await this.userReposatory.updateone({
      filter:{
        _id: new Types.ObjectId(friendId)
      },
      data:{
        $addToSet:{ friends :new Types.ObjectId(userId)}
      }
    })
    return friendship
  }
}

export default new FriendService();