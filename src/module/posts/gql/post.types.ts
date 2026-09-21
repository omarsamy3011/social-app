import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";


export const helloworldtype = new GraphQLObjectType({
            name:'helloworldtype',
            fields:{
                message:{type:GraphQLString}
            }
            })

export const onePostType = new GraphQLObjectType({
    name:'onePostType',
    fields:{
        title:{type:GraphQLString},
        content:{type:GraphQLString},
        userId:{type:new GraphQLObjectType({
            name:'userType',
            fields:{
                firstName:{type:GraphQLString},
                _id:{type:GraphQLID}
            }
        })},
        comments:{type: new GraphQLList(GraphQLString)},
        likes:{type: new GraphQLList(GraphQLString)},
        createdAt:{type:GraphQLString},
        editedAt:{type:GraphQLString}
    }
})

export const allPostsType = new GraphQLList(onePostType)