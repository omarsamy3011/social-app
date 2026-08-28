import { createClient, RedisClientType } from "redis";
import { env } from "../../config/env.service";
import { BadRequestError } from "../exceptions/error.exceptions";
import { Types } from "mongoose";



class RedisService {
    private client : RedisClientType
    constructor(){
        this.client = createClient({url:env.redis_url as string})
        this.handlingConnection()
    }
    async connectRedis(){
        await this.client.connect()
    }
    handlingConnection(){
        this.client.on("error",()=>{
            console.log('redis connection failed')
        })
        this.client.on("ready",()=>{
            console.log('redis connected successfully')
        })
    }
    async set({key,value,ttl}:{
        key:string,
        value:any,
        ttl?:number
    }){
        if(typeof value == "object"){
            value = JSON.stringify(value)
        }
        ttl?await this.client.set(key,value,{EX:ttl}):await this.client.set(key,value)
    }
    async get({key}:{key:string}){
        return await this.client.get(key)
    }
    async ttl ({key}:{key:string}){
    return await this.client.ttl(key)
    }
    async exists({key}:{key:string}){
    return await this.client.exists(key)
    }
    async redis_delete({key}:{key:string}){
    return await this.client.del(key)
    }
    async redis_mget({keys}:{keys:string[]}):Promise<string[]>{
        return await this.client.mGet(keys) as string[]
    
    }
    createRevokeToken({userId,token}:{
        userId:Types.ObjectId,
        token:string
    }){
        return `revokeToken::${userId}:${token}`
    }
}

export const redisService = new RedisService()