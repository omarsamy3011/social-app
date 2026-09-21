"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postservice = void 0;
const post_model_1 = __importDefault(require("../../database/model/post.model"));
const database_reposatory_1 = require("../../database/reposatory/database.reposatory");
class postService {
    postReposatory;
    constructor() {
        this.postReposatory = new database_reposatory_1.DatabaseReposatory(post_model_1.default);
    }
    async getAllPosts() {
        const data = await this.postReposatory.findall({
            populate: {
                path: 'userId',
                select: 'firstName'
            }
        });
        return data;
    }
}
exports.postservice = new postService();
