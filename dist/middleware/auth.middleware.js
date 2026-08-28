"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const token_1 = require("../common/service/token");
const error_exceptions_1 = require("../common/exceptions/error.exceptions");
let tokenService = new token_1.TokenService();
const auth = (req, res, next) => {
    if (req.headers.authorization) {
        let [flag, token] = req.headers.authorization.split(' ');
        let data = tokenService.decodeToken(token);
        if (data) {
            req.user = data;
            next();
        }
        else {
            throw new error_exceptions_1.BadRequestError('session time expired');
        }
    }
    else {
        throw new error_exceptions_1.BadRequestError('no token sent');
    }
};
exports.auth = auth;
