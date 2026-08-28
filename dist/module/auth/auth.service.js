"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const sendemail_1 = require("../../common/email/sendemail");
const error_exceptions_1 = require("../../common/exceptions/error.exceptions");
const security_1 = require("../../common/security/security");
const redisService_1 = require("../../common/service/redisService");
const s3service_1 = require("../../common/service/s3service");
const token_1 = require("../../common/service/token");
const user_model_1 = __importDefault(require("../../database/model/user.model"));
const database_reposatory_1 = require("../../database/reposatory/database.reposatory");
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    userReposatory;
    tokenService;
    constructor() {
        this.userReposatory = new database_reposatory_1.DatabaseReposatory(user_model_1.default);
        this.tokenService = new token_1.TokenService();
    }
    async signup(data, file) {
        let user = await this.userReposatory.findone({ filter: { email: data.email } });
        if (user) {
            throw new error_exceptions_1.BadRequestError('user already exist try another email');
        }
        let hashedpass = await (0, security_1.genertateHash)({ plainText: data.password });
        data.password = hashedpass;
        let picture = [];
        if (file) {
            let picURL = await s3service_1.s3service.uploadFile({ file, memoryStorage: common_1.MulterStorageEnums.diskStorage });
            picture.push(picURL);
        }
        data.profilepic = picture;
        const otp = crypto_1.default.randomInt(100000, 1000000).toString();
        try {
            await (0, sendemail_1.sendEmail)({
                to: `${data.email}`,
                subject: `Verify Your Account Please`,
                html: `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f8; padding: 40px 10px;">
        <tr>
        <td align="center">
            <table role="presentation" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); padding: 30px;">
            
            <!-- Header / Brand -->
            <tr>
                <td align="center" style="padding-bottom: 20px;">
                <h2 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 700;">Verification Code</h2>
                </td>
            </tr>

            <!-- Content -->
            <tr>
                <td align="center" style="color: #555555; font-size: 15px; line-height: 1.5; padding-bottom: 25px;">
                Please use the one-time verification code below to complete your login. This code is valid for <strong>5 minutes</strong>.
                </td>
            </tr>

            <!-- OTP Box -->
            <tr>
                <td align="center" style="padding-bottom: 25px;">
                <div style="display: inline-block; background-color: #f0f4ff; border: 1px dashed #4f46e5; border-radius: 8px; padding: 15px 35px;">
                    <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #4f46e5;"><!-- OTP_CODE_HERE -->${otp}</span>
                </div>
                </td>
            </tr>

            <!-- Security Note -->
            <tr>
                <td align="center" style="color: #888888; font-size: 13px; line-height: 1.4;">
                If you didn't request this code, you can safely ignore this email. Someone might have typed your address by mistake.
                </td>
            </tr>

            <!-- Divider -->
            <tr>
                <td style="padding-top: 25px; border-bottom: 1px solid #eeeeee;"></td>
            </tr>

            <!-- Footer -->
            <tr>
                <td align="center" style="padding-top: 20px; color: #aaaaaa; font-size: 12px;">
                &copy; 2026 Your App Name. All rights reserved.
                </td>
            </tr>

            </table>
        </td>
        </tr>
    </table>
    </body>
    </html>`
            });
        }
        catch (error) {
            throw new error_exceptions_1.BadRequestError('no email sent try again');
        }
        redisService_1.redisService.set({ key: `otp::${data.email}`, value: `${await (0, security_1.genertateHash)({ plainText: otp })}`, ttl: 60 * 5 });
        return await this.userReposatory.create(data);
    }
    async login(data) {
        let { email, password } = data;
        let userData = await this.userReposatory.findone({ filter: { email } });
        if (userData) {
            let isMatched = await (0, security_1.compareHash)({ plainText: password, cypherText: userData.password });
            if (isMatched) {
                return this.tokenService.generateToken(userData);
            }
            else {
                throw new error_exceptions_1.BadRequestError('password invalid');
            }
        }
        else {
            throw new error_exceptions_1.NotFoundError('user not found');
        }
    }
    async gets3url(name) {
        return await s3service_1.s3service.GetPreSignURL({ Originalname: name });
    }
    async verify(data) {
        let user = await this.userReposatory.findone({ filter: { email: data.email } });
        if (user.confirmEmail) {
            throw new error_exceptions_1.BadRequestError('user is already verified');
        }
        let hashedotp = await redisService_1.redisService.get({ key: `otp::${data.email}` });
        if (!hashedotp) {
            throw new error_exceptions_1.BadRequestError('OTP Expired , Click To Resend');
        }
        let matchedotp = await (0, security_1.compareHash)({ plainText: data.otp, cypherText: hashedotp });
        if (matchedotp) {
            return await this.userReposatory.updateone({ filter: { email: data.email }, data: { confirmEmail: true } });
        }
        else {
            throw new error_exceptions_1.BadRequestError('OTP is not correct');
        }
    }
}
exports.default = new AuthService;
