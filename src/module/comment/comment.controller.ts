import { Router, type Response, type NextFunction } from 'express';
import commentService from './comment.service';
import { successResponce } from '../../common/exceptions/successresponce';
import { auth, userRequest } from '../../middleware/auth.middleware';

const router: Router = Router();

router.post('/post/:postId',auth,async (req: userRequest, res: Response, next: NextFunction) => {
    const data = await commentService.createComment(req.user.id, req.params.postId as string, req.body.content);
    successResponce({res,message: 'Comment added successfully',data,})
})

router.get('/post/:postId',auth,async (req: userRequest, res: Response, next: NextFunction) => {
    const data = await commentService.getPostComments( req.params.postId as string);
    successResponce({res,message: 'Comments retrieved successfully',data})
})

router.delete('/:commentId',auth,async (req: userRequest, res: Response, next: NextFunction) => {
    const data = await commentService.deleteComment(req.user.id, req.params.commentId as string);
    successResponce({res,message: 'Comment deleted successfully',data})
})

export default router;