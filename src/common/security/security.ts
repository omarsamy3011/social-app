<<<<<<< HEAD
import bcrypt from 'bcrypt'
import { env } from '../../config/env.service'

export const genertateHash = async ({plainText,salt = env.salt}:{
        plainText:string,
        salt?:string
    }):Promise<string>=>{
        return await bcrypt.hash(plainText,Number(salt))
}

export const compareHash = async ({plainText,cypherText}:{
        plainText:string,
        cypherText:string
    }):Promise<boolean> =>{
        return await bcrypt.compare(plainText,cypherText)
}
=======
import bcrypt from 'bcrypt'
import { env } from '../../config/env.service'

export const genertateHash = async ({plainText,salt = env.salt}:{
        plainText:string,
        salt?:string
    }):Promise<string>=>{
        return await bcrypt.hash(plainText,Number(salt))
}

export const compareHash = async ({plainText,cypherText}:{
        plainText:string,
        cypherText:string
    }):Promise<boolean> =>{
        return await bcrypt.compare(plainText,cypherText)
}
>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
