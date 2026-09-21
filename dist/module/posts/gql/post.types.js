"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allPostsType = exports.onePostType = exports.helloworldtype = void 0;
const graphql_1 = require("graphql");
exports.helloworldtype = new graphql_1.GraphQLObjectType({
    name: 'helloworldtype',
    fields: {
        message: { type: graphql_1.GraphQLString }
    }
});
exports.onePostType = new graphql_1.GraphQLObjectType({
    name: 'onePostType',
    fields: {
        title: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        userId: { type: new graphql_1.GraphQLObjectType({
                name: 'userType',
                fields: {
                    firstName: { type: graphql_1.GraphQLString },
                    _id: { type: graphql_1.GraphQLID }
                }
            }) },
        comments: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        likes: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        createdAt: { type: graphql_1.GraphQLString },
        editedAt: { type: graphql_1.GraphQLString }
    }
});
exports.allPostsType = new graphql_1.GraphQLList(exports.onePostType);
