"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postScema = void 0;
const graphql_1 = require("graphql");
const post_args_1 = require("./post.args");
const post_resolver_1 = require("./post.resolver");
const post_types_1 = require("./post.types");
class PostSchema {
    constructor() { }
    helloworld() {
        return {
            helloworld: {
                name: 'helloWorld',
                type: post_types_1.helloworldtype,
                args: post_args_1.helloworldargs,
                resolve: post_resolver_1.postResolver.postRegister
            },
            test: {
                type: graphql_1.GraphQLString,
                resolve() {
                    return `test from query`;
                }
            }
        };
    }
    postRegister() {
        return {
            getAllPosts: {
                name: 'getAll',
                type: post_types_1.allPostsType,
                resolve: post_resolver_1.postResolver.getAllPosts
            },
        };
    }
}
exports.postScema = new PostSchema();
