<<<<<<< HEAD
import mongoose from "mongoose"
import { env } from "../config/env.service"



export const dbconnection=()=>{
    mongoose.connect(env.dataBase_url as string)
    .then(()=>{console.log("database connected")})
    .catch((err)=>console.log(err))
}
=======
import mongoose from "mongoose"
import { env } from "../config/env.service"



export const dbconnection=()=>{
    mongoose.connect(env.dataBase_url as string)
    .then(()=>{console.log("database connected")})
    .catch((err)=>console.log(err))
}
>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
