import { Router, type Response, type NextFunction } from 'express';
import postService from './post.service';
import { successResponce } from '../../common/exceptions/successresponce';
import { auth, userRequest } from '../../middleware/auth.middleware';

const router: Router = Router();

router.post('/createPost', auth, async (req: userRequest, res: Response, next: NextFunction) => {
    const data = await postService.createPost(req.user.id, req.body)
    successResponce({res,message: 'Post created successfully',data})
})

router.get('/', auth, async (req: userRequest, res: Response, next: NextFunction) => {
    const data = await postService.getAllPosts();
    return successResponce({res,message: 'Posts retrieved successfully',data})
})

router.patch('/:postId/like', auth, async (req: userRequest, res: Response, next: NextFunction) => {
    const data = await postService.LikeOrUnlikePost(req.user.id, req.params.postId as string)
    return successResponce({res,message:data})
})

router.delete('/:postId', auth, async (req: userRequest, res: Response, next: NextFunction) => {
    const data = await postService.deletePost(req.user.id, req.params.postId as string)
    return successResponce({res,message: 'Post deleted successfully',data})
})

export default router;