"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const validation_1 = require("../../../common/service/validation");
const post_service_1 = require("../post.service");
const post_validation_1 = require("../post.validation");
class PostResolver {
    constructor() {
    }
    postRegister(parent, args) {
        (0, validation_1.graphQLValidation)(post_validation_1.postValidation, args);
        return { message: `hello ${args.name} your age is ${args.age}` };
    }
    async getAllPosts() {
        let data = await post_service_1.postservice.getAllPosts();
        return data;
    }
}
exports.postResolver = new PostResolver();
