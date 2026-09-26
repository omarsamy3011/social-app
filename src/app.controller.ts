import express from 'express'
import type { Express, Request, Response } from 'express'
import authRouter from './module/auth/auth.controller'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { env } from './config/env.service'
import { dbconnection } from './database/connection'
import { globalErrorHandling } from './middleware/errorHandling'
import {promisify} from 'util'   ///for getfile from s3 bucket
import { pipeline } from 'stream'  ///for getfile from s3 bucket
import { s3service } from './common/service/s3service'
import { redisService } from './common/service/redisService'
import { createHandler } from 'graphql-http/lib/use/express';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import {schema} from './module/gql/index'
import chatRouter from './module/chat/chat.controller'
import userRouter from './module/user/user.controller'
import friendRouter from './module/friend/friend.controller'
import postRouter from './module/posts/post.controller'
import commentRouter from './module/comment/comment.controller'
import { Server } from 'socket.io'
import { TokenService } from './common/service/token'
import { realTimeGateway } from './module/realTime/realTime.gateWay'



export const bootstrap = async()=>{
    const app : Express = express()
    app.use(express.json())
    app.get('/check-health',(req:Request,res :Response)=>{
        res.json({state:'good'})
    })
    app.use(cors({
        origin:'*'
    }))

    const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})
    const S3GetFile = promisify(pipeline)
    app.get('/uploads/*path',async(req:Request,res:Response)=>{
        let {path} = req.params as {path:string[]}
        let key = path.join('/')
        let {Body,ContentType} = await s3service.getFileFromBucket({key})
        await S3GetFile(Body as NodeJS.ReadableStream , res)
        //res.setHeader("Content-Type", ContentType || "application/octet-stream")   //it make error idk why
        //res.set("Cross-Origin-Resource-Policy", "cross-origin")
    })
    app.use(limiter)
    app.use(helmet())
    app.use('/auth',authRouter)
    app.use('/chat',chatRouter)
    app.use('/user',userRouter)
    app.use('/comments', commentRouter)
    app.use('/post',postRouter)
    app.use('/users/friends', friendRouter)
    dbconnection()
    await redisService.connectRedis()
    
    app.all('/graphQL',createHandler({schema,context:(req)=>({req})}))

    app.use(globalErrorHandling)
    const httpserver = app.listen(env.port,()=>{
        console.log(`server running on port ${env.port}`);
    })
    realTimeGateway.initializer(httpserver)

}
