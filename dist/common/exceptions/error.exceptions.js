"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NotFoundError = exports.BadRequestError = exports.mapGraphQL = void 0;
const graphql_1 = require("graphql");
class ApplicationError extends Error {
    status;
    constructor(message, status, cause) {
        super(message, { cause });
        this.status = status;
    }
}
const mapGraphQL = (error) => {
    throw new graphql_1.GraphQLError(error.message, { extensions: { statusCode: error.status, cause: error.cause || {} } });
};
exports.mapGraphQL = mapGraphQL;
class BadRequestError extends ApplicationError {
    constructor(message, cause) {
        super(message, 400, cause);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends ApplicationError {
    constructor(message, cause) {
        super(message, 404, cause);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends ApplicationError {
    constructor(message, cause) {
        super(message, 409, cause);
    }
}
exports.ConflictError = ConflictError;
