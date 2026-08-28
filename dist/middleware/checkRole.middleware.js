"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const database_reposatory_1 = require("../database/reposatory/database.reposatory");
const user_model_1 = __importDefault(require("../database/model/user.model"));
const error_exceptions_1 = require("../common/exceptions/error.exceptions");
let userReposatory = new database_reposatory_1.DatabaseReposatory(user_model_1.default);
const checkRole = (Roles) => {
    return async (req, res, next) => {
        let dataUser = await userReposatory.findById({ id: req.user.id });
        if (!dataUser) {
            throw new error_exceptions_1.NotFoundError('user not found');
        }
        let matched = Roles.find((role) => role == dataUser.role);
        if (matched) {
            next();
        }
        else {
            throw new error_exceptions_1.BadRequestError('unauthorized trial');
        }
    };
};
exports.checkRole = checkRole;
