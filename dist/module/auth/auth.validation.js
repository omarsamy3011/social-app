"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = {
    body: zod_1.z.strictObject({
        userName: zod_1.z.string().min(5, { error: 'must be more than 4 characters' }),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        phone: zod_1.z.string(),
        confirmPassword: zod_1.z.string(),
        profilepic: zod_1.z.array(zod_1.z.string()).optional(),
        friends: zod_1.z.array(zod_1.z.string()).optional(),
        friendrequests: zod_1.z.array(zod_1.z.string()).optional()
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue('confirmpassword must match the password');
        }
    })
};
