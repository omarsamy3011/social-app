import { Router, type Response, type NextFunction } from 'express';
import friendService from './friend.service';
import { successResponce } from '../../common/exceptions/successresponce';
import { auth, userRequest } from '../../middleware/auth.middleware';

const router: Router = Router();


router.post('/request/:receiverId',auth,async (req: userRequest, res: Response, next: NextFunction) => {
      const data = await friendService.sendFriendRequest(req.user.id, req.params.receiverId as string)
      successResponce({res,message: 'Friend request sent successfully',data})
})

router.patch('/accept/:friendId',auth,async (req: userRequest, res: Response, next: NextFunction) => {
      const data = await friendService.respondToRequest(req.user.id, req.params.friendId as string, {action: 'accepted'})
      return successResponce({res,message: 'Friend request accepted successfully',data})
})

router.patch('/reject/:friendId',auth,async (req: userRequest, res: Response, next: NextFunction) => {
      const data = await friendService.respondToRequest(req.user.id, req.params.friendId as string, {action: 'rejected'})
      return successResponce({res,message: 'Friend request rejected successfully',data})
})

export default router;