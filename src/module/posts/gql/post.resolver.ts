import { graphQLValidation } from "../../../common/service/validation"
import { postservice } from "../post.service"
import { postValidation } from "../post.validation"


class PostResolver {
    constructor(){
    }

    postRegister(parent:any,args:any){
        graphQLValidation(postValidation,args)
                return {message:`hello ${args.name} your age is ${args.age}`}
            }

    async getAllPosts(){
        let data= await postservice.getAllPosts()    // array of objs        
        return data
    }
}

export const postResolver = new PostResolver()