<<<<<<< HEAD
import { string, z } from "zod";


export const signupSchema = {
    body:z.strictObject({
        userName:z.string().min(5,{error:'must be more than 4 characters'}),
        email:z.string().email(),
        password:z.string(),
        phone:z.string(),
        confirmPassword:z.string(),
        profilepic:z.array(z.string()).optional(),
        friends:z.array(z.string()).optional(),
        friendrequests:z.array(z.string()).optional()
    }).superRefine((data,ctx)=>{
        if(data.password !== data.confirmPassword){
            ctx.addIssue('confirmpassword must match the password')
        }
    })
=======
import { string, z } from "zod";


export const signupSchema = {
    body:z.strictObject({
        userName:z.string().min(5,{error:'must be more than 4 characters'}),
        email:z.string().email(),
        password:z.string(),
        phone:z.string(),
        confirmPassword:z.string(),
        profilepic:z.array(z.string()).optional()
    }).superRefine((data,ctx)=>{
        if(data.password !== data.confirmPassword){
            ctx.addIssue('confirmpassword must match the password')
        }
    })
>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
}