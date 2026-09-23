import { Router, type Response, type NextFunction } from 'express';
import friendService from './friend.service';
import { successResponce } from '../../common/exceptions/successresponce';
import { auth, userRequest } from '../../middleware/auth.middleware';

const router: Router = Router();


router.post(
  '/request/:receiverId',
  auth,
  async (req: userRequest, res: Response, next: NextFunction) => {
    try {
      const senderId = req.user.id;
      const recipientIdentifier = req.params.receiverId;

      const data = await friendService.sendFriendRequest(senderId, recipientIdentifier as string);

      return successResponce({
        res,
        message: 'Friend request sent successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/accept/:friendId',
  auth,
  async (req: userRequest, res: Response, next: NextFunction) => {
    try {
      const receiverId = req.user.id;
      const friendId = req.params.friendId;

      const data = await friendService.respondToRequest(receiverId, friendId as string, {
        action: 'accepted',
      });

      return successResponce({
        res,
        message: 'Friend request accepted successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/reject/:friendId',
  auth,
  async (req: userRequest, res: Response, next: NextFunction) => {
    try {
      const receiverId = req.user._id;
      const friendId = req.params.friendId;

      const data = await friendService.respondToRequest(receiverId, friendId as string, {
        action: 'rejected',
      });

      return successResponce({
        res,
        message: 'Friend request rejected successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;