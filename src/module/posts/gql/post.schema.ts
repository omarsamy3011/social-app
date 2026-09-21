import { GraphQLString } from "graphql"
import { createPost, helloworldargs } from "./post.args"
import { postResolver } from "./post.resolver"
import { allPostsType, helloworldtype } from "./post.types"


class PostSchema {
constructor(){}

    
    helloworld(){
        return{
        helloworld:{
            name:'helloWorld',
            type:helloworldtype,
            args:helloworldargs,
            resolve:postResolver.postRegister
            },
        test:{
            type:GraphQLString,
            resolve(){
                return `test from query`
            }
        }
        }}

postRegister(){
    return{
        getAllPosts:{
            name:'getAll',
            type:allPostsType,
            resolve:postResolver.getAllPosts
        },
        // createPost:{
        //     name:'create',
        //     type:helloworldtype,
        //     args:createPost,
        //     resolve:postResolver.postRegister
        // }
    }
    }
    }

export const postScema = new PostSchema()