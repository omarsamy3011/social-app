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
}