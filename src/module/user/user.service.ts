import userModel from '../../database/model/user.model';
import friendModel from '../../database/model/friend.model';
import { FriendStatusEnum } from '../../common/enums/friend.enum';
import { DatabaseReposatory } from '../../database/reposatory/database.reposatory';
import { IFriend } from '../../common/interfaces/friend.interface';
import { IUser } from '../../common';

class UserService {
  private friendReposatory : DatabaseReposatory<IFriend>
  private userReposatory : DatabaseReposatory<IUser>
    constructor(){
        this.friendReposatory = new DatabaseReposatory<IFriend>(friendModel)
        this.userReposatory = new DatabaseReposatory<IUser>(userModel)
    }
  async getUserProfileWithFriends(userId: string) {
    // 1. Fetch current user
    const currentUser = await this.userReposatory.findById({id:userId,
      populate:[{
        path:'groups'
      }]
    });
    // 2. Fetch accepted friendships
    const friendships = await friendModel
      .find({
        $or: [
          { sender: userId, status: FriendStatusEnum.ACCEPTED },
          { receiver: userId, status: FriendStatusEnum.ACCEPTED },
        ],
      })
      .populate('sender', '_id firstName lastName email profilepic')
      .populate('receiver', '_id firstName lastName email profilepic');

    // Format friends list for frontend
    const friends = friendships.map((f: any) => {
      const friendObj = f.sender._id.toString() === userId.toString() ? f.receiver : f.sender;
      return {
        _id: friendObj._id,
        username: `${friendObj.firstName || ''} ${friendObj.lastName || ''}`.trim(),
        email: friendObj.email,
        profilePicture: friendObj.profilepic,
      };
    });

    // 3. Fetch pending friend requests
    const pendingRequests = await friendModel
      .find({ receiver: userId, status: FriendStatusEnum.PENDING })
      .populate('sender', '_id firstName lastName email profilepic');

    const friendRequests = pendingRequests.map((req: any) => ({
      _id: req.sender._id, // User ID of sender
      username: `${req.sender.firstName || ''} ${req.sender.lastName || ''}`.trim(),
      email: req.sender.email,
      profilePicture: req.sender.profilepic,
      groups: req.sender.groups
    }));

    // 4. Return formatted response matching frontend expectations
    return {
      user: {
        _id: currentUser?._id,
        username: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim(),
        email: currentUser?.email,
        profilePicture: currentUser?.profilepic,
        friends,
        friendRequests
      },
      groups: currentUser.groups
    };
  }
}

export default new UserService();