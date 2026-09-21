"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLValidation = exports.validation = void 0;
const error_exceptions_1 = require("../exceptions/error.exceptions");
const validation = (schema) => {
    return (req, res, next) => {
        let validationErrors = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key]) {
                throw new error_exceptions_1.BadRequestError("Validation error");
            }
            const result = schema[key].safeParse(req[key]);
            if (!result.success) {
                validationErrors.push({ key, issue: result.error.issues });
            }
            if (validationErrors.length > 0) {
                throw new error_exceptions_1.BadRequestError('validation error', validationErrors);
            }
            next();
        }
    };
};
exports.validation = validation;
const graphQLValidation = (schema, args) => {
    let result = schema.safeParse(args);
    let errors = [];
    if (!result.success) {
        errors.push(result.error.issues);
        throw (0, error_exceptions_1.mapGraphQL)(new error_exceptions_1.BadRequestError('invalid validation', { error: errors }));
    }
    return true;
};
exports.graphQLValidation = graphQLValidation;
