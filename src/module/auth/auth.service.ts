import { email } from "zod"
import { IUser, MulterStorageEnums } from "../../common"
import { sendEmail } from "../../common/email/sendemail"
import { BadRequestError, NotFoundError } from "../../common/exceptions/error.exceptions"
import { compareHash, genertateHash } from "../../common/security/security"
import { redisService } from "../../common/service/redisService"
import { s3service } from "../../common/service/s3service"
import { TokenService } from "../../common/service/token"
import userModel from "../../database/model/user.model"
import { DatabaseReposatory } from "../../database/reposatory/database.reposatory"
import { SignupDTO } from "./dto/auth.dto"
import crypto from 'crypto'
import { log } from "console"


class AuthService {
    private userReposatory :DatabaseReposatory<IUser>
    private tokenService : TokenService
    constructor(){
        this.userReposatory = new DatabaseReposatory(userModel)
        this.tokenService = new TokenService()
    }

    async signup(data:SignupDTO,file:Express.Multer.File){
        let user = await this.userReposatory.findone({filter:{email :data.email}})
        if(user){
            throw new BadRequestError('user already exist try another email')
        }
        let hashedpass = await genertateHash({plainText:data.password})
        data.password = hashedpass
        let picture = []
        if(file){
            let picURL = await s3service.uploadFile({file,memoryStorage:MulterStorageEnums.diskStorage})
            picture.push(picURL)
        }
        data.profilepic = picture
        const otp = crypto.randomInt(100000, 1000000).toString()
        try {
            await sendEmail({
            to:`${data.email}`,
            subject:`Verify Your Account Please`,
            html:`<!DOCTYPE html>
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
        })
        } catch (error) {
            throw new BadRequestError('no email sent try again')
        }
        redisService.set({key:`otp::${data.email}`,value:`${await genertateHash({plainText:otp})}`,ttl:60*5})
        return await this.userReposatory.create(data)
    }

    async login(data:IUser){
        let { email , password} =data
        let userData = await this.userReposatory.findone({filter:{email}})        
        if(userData){
            let isMatched = await compareHash({plainText:password,cypherText:userData.password})
            if(isMatched){
                return this.tokenService.generateToken(userData)
            }else{
                throw new BadRequestError('password invalid')
            }
        }else{
            throw new NotFoundError('user not found')
        }
    }

    async gets3url(name:string){
        return await s3service.GetPreSignURL({Originalname:name})
    }

    async verify(data:any){
        let user = await this.userReposatory.findone({filter:{email:data.email}})
        if(user.confirmEmail){
            throw new BadRequestError('user is already verified')
        }
        let hashedotp = await redisService.get({key:`otp::${data.email}`})            
        if(!hashedotp){
            throw new BadRequestError('OTP Expired , Click To Resend')
        }
        let matchedotp = await compareHash({plainText:data.otp,cypherText:hashedotp as string})
        if(matchedotp){
            return await this.userReposatory.updateone({filter:{email:data.email},data:{confirmEmail:true}})
        }else{
            throw new BadRequestError('OTP is not correct')
        }
    }
}

export default new AuthService