<<<<<<< HEAD
import { NextFunction, Request, Response } from "express";
import { TokenService } from "../common/service/token";
import { BadRequestError } from "../common/exceptions/error.exceptions";

let tokenService = new TokenService()

export interface userRequest extends Request { ////// to allow user be additional field in request type
    user?:any
}

export const auth =(req:userRequest,res:Response,next:NextFunction)=>{    
    if(req.headers.authorization){
        let [flag,token] = req.headers.authorization.split(' ')        
        let data = tokenService.decodeToken(token as string)
        if(data){
            req.user = data
            next()
        }else{
            throw new BadRequestError('session time expired')
        }
    }else{
            throw new BadRequestError('no token sent')
    }
=======
import { NextFunction, Request, Response } from "express";
import { TokenService } from "../common/service/token";
import { BadRequestError } from "../common/exceptions/error.exceptions";

let tokenService = new TokenService()

export interface userRequest extends Request { ////// to allow user be additional field in request type
    user?:any
}

export const auth =(req:userRequest,res:Response,next:NextFunction)=>{    
    if(req.headers.authorization){
        let [flag,token] = req.headers.authorization.split(' ')        
        let data = tokenService.decodeToken(token as string)
        if(data){
            req.user = data
            next()
        }else{
            throw new BadRequestError('session time expired')
        }
    }else{
            throw new BadRequestError('no token sent')
    }
>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
}