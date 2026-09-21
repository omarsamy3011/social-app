<<<<<<< HEAD
import { Response } from "express";


export const successResponce =({ res, message = 'success', status = 200, data }: 
    { res: Response; message?: string; status?: number; data?: any; })=>{
    return res.status(status).json({
        message,
        data
    })
}
//same function .... types should written like above one
// export const successResponce =(res:Response,message:string='success',status:number=200,data:any)=>{
//     return res.status(status).json({
//         message:message,
//         data:data
//     })
=======
import { Response } from "express";


export const successResponce =({ res, message = 'success', status = 200, data }: 
    { res: Response; message?: string; status?: number; data?: any; })=>{
    return res.status(status).json({
        message,
        data
    })
}
//same function .... types should written like above one
// export const successResponce =(res:Response,message:string='success',status:number=200,data:any)=>{
//     return res.status(status).json({
//         message:message,
//         data:data
//     })
>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
// }