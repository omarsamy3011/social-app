<<<<<<< HEAD
import { NextFunction, Request, Response } from "express";


export const globalErrorHandling =(err:any,req:Request,res:Response,next:NextFunction)=>{
    return res.status(err.status || 500 ).json({
        message:err.message,
        stack:err.stack,
        cause:err.cause,
        err
    })
=======
import { NextFunction, Request, Response } from "express";


export const globalErrorHandling =(err:any,req:Request,res:Response,next:NextFunction)=>{
    return res.status(err.status || 500 ).json({
        message:err.message,
        stack:err.stack,
        cause:err.cause,
        err
    })
>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
}