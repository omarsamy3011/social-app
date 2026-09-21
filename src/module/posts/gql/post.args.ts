import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";



export const helloworldargs = {
                name:{
                    type:GraphQLString
                },
                age:{
                    type:GraphQLString
                }
            }

export const createPost ={
    title:{
        type:GraphQLString
    },
    content:{
        type:GraphQLString
    },
    userId:{
        type:new GraphQLObjectType({
                    name:'userType',
                    fields:{
                        firstName:{type:GraphQLString},
                        _id:{type:GraphQLID}}}
    )
    }}