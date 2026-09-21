import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import { postScema } from "../posts/gql/post.schema"

const query= new GraphQLObjectType({
        name:'rootQuery',
        fields:{
            ...postScema.helloworld(),
            ...postScema.postRegister()
        }})

// const mutation= new GraphQLObjectType({
//         name:'rootQuery',
//         fields:{
//             helloworld:{
//                 type:GraphQLString,
//                 args:{
//                     name:{
//                         type:GraphQLString
//                     },
//                     age:{
//                         type:GraphQLString
//                     }
//                 },
//                 resolve(parent,args){
//                     return `hello ${args.name} your age is ${args.age}`
//                 }
//             },
//             test:{
//                 type:GraphQLString,
//                 resolve(){
//                     return `test from query`
//                 }
//             }
//         }})



export const schema = new GraphQLSchema({query})