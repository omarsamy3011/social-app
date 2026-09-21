"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.helloworldargs = void 0;
const graphql_1 = require("graphql");
exports.helloworldargs = {
    name: {
        type: graphql_1.GraphQLString
    },
    age: {
        type: graphql_1.GraphQLString
    }
};
exports.createPost = {
    title: {
        type: graphql_1.GraphQLString
    },
    content: {
        type: graphql_1.GraphQLString
    },
    userId: {
        type: new graphql_1.GraphQLObjectType({
            name: 'userType',
            fields: {
                firstName: { type: graphql_1.GraphQLString },
                _id: { type: graphql_1.GraphQLID }
            }
        })
    }
};
