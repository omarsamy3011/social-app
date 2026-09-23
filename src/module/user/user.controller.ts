import { Router, Response } from 'express';
import { auth, userRequest } from '../../middleware/auth.middleware';
import userService from './user.service';
import { successResponce } from '../../common/exceptions/successresponce';

const router = Router();

// GET /user (or GET / when mounted under /user)
router.get('/', auth, async (req: userRequest, res: Response) => {
  const userId = req.user.id;
  
  const data = await userService.getUserProfileWithFriends(userId);
  
  return successResponce({
    res,
    message: 'User data retrieved successfully',
    data,
  });
});

export default router;