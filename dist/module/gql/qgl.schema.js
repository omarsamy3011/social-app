"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const post_schema_1 = require("../posts/gql/post.schema");
const query = new graphql_1.GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        ...post_schema_1.postScema.helloworld(),
        ...post_schema_1.postScema.postRegister()
    }
});
exports.schema = new graphql_1.GraphQLSchema({ query });
