import { Types } from 'mongoose';
import { BadRequestError, NotFoundError } from '../../common/exceptions/error.exceptions';
import { DatabaseReposatory } from '../../database/reposatory/database.reposatory';
import { IPost } from '../../common/interfaces/post.interface';
import { IComment } from '../../common/interfaces/comment.interface';
import postModel from '../../database/model/post.model';
import commentModel from '../../database/model/comment.model';

class CommentService {
    private postRepository: DatabaseReposatory<IPost>
    private commentRepository: DatabaseReposatory<IComment>
    constructor(){
        this.postRepository = new DatabaseReposatory<IPost>(postModel)
        this.commentRepository = new DatabaseReposatory<IComment>(commentModel)
    }

    async createComment(userId: string, postId: string, content: string) {
        if (!content) {
            throw new BadRequestError('Comment content is required');
        }
        const post = await this.postRepository.findById({id:postId});
        if (!post) {
            throw new NotFoundError('Post not found');
        }
        const comment = await this.commentRepository.create({
            content,
            postId: new Types.ObjectId(postId),
            createdBy: new Types.ObjectId(userId)
        })
        return comment
    }

    async getPostComments(postId: string) {
        const post = await this.postRepository.findById({id:postId});
        if (!post) {
            throw new NotFoundError('Post not found');
        }
        return await this.commentRepository.findall({
            filter:{
                postId:postId
            },
            populate:`'createdBy', '_id firstName lastName email profilepic'`
        });
        }

    async deleteComment(userId: string, commentId: string) {
        const comment = await this.commentRepository.findById({id:commentId});
        if (!comment) {
        throw new NotFoundError('Comment not found')
        }

        const isCommentAuthor = comment.createdBy._id == userId
        if (!isCommentAuthor) {
        const post = await this.postRepository.findById({id:comment.postId})
        const isPostOwner = post?.createdBy._id == userId
        if (!isPostOwner) {
            throw new BadRequestError('You are not allowed to delete this comment');
        }
        }

        return await this.commentRepository.deleteById(commentId)
    }
}

export default new CommentService();