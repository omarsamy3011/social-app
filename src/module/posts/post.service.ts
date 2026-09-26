import { Types } from "mongoose"
import { BadRequestError, NotFoundError } from "../../common/exceptions/error.exceptions"
import { IPost } from "../../common/interfaces/post.interface"
import postModel from "../../database/model/post.model"
import { DatabaseReposatory } from "../../database/reposatory/database.reposatory"



class postService {
    private postReposatory : DatabaseReposatory<IPost>
    constructor(){
        this.postReposatory = new DatabaseReposatory<IPost>(postModel)
    }

    async getAllPosts (){
        const data = await this.postReposatory.findall({
            populate:{
                path:'userId',
                select:'firstName'
            }
        })        
        return data
    }

    async createPost(userId: string, payload: { title:string,content?: string; attachments?: string[] }) {
    if (!(payload.content || payload.attachments?.length)) {
        throw new BadRequestError('Post content is required')
    }
    const post = await this.postReposatory.create({
        title: payload.title,
        content: payload.content || '',
        attachments: payload.attachments || [],
        createdBy: new Types.ObjectId(userId),
    })
        return post
    }

    async LikeOrUnlikePost(userId: string, postId: string) {
    const post = await this.postReposatory.findById({id:postId})
    if (!post) {
        throw new NotFoundError('Post not found');
    }
    const hasLiked = post.likes?.find((id:Types.ObjectId) => id.toString() === userId)
    if(hasLiked){
        this.postReposatory.updateone({
            filter:{_id : new Types.ObjectId(postId)},
            data:{
                $pull: { likes: new Types.ObjectId(userId) }
            }
        })
        return 'like removed'
    }else{
        this.postReposatory.updateone({
            filter:{_id : new Types.ObjectId(postId)},
            data:{
                $push: { likes: new Types.ObjectId(userId) }
            }
        })
        return 'like added'
    }
    }

    async deletePost(userId: string, postId: string) {
        const post = await this.postReposatory.findById({id:postId});
        if (!post) {
            throw new NotFoundError('Post not found');
        }
        if (post.createdBy._id.toString() !== userId) {
            throw new BadRequestError('You are not allowed to delete this post');
        }
        await this.postReposatory.deleteById(postId);
            return { message: 'Post deleted successfully' };
        }
}

const postservice = new postService()

export default postservice