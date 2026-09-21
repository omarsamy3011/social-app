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
}

export const postservice = new postService()