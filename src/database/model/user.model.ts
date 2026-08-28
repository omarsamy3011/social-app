import mongoose from 'mongoose'
//import { IUser } from '../../common/interfaces/user.interface'
import { genderEnum, IUser, providerEnum, roleEnum } from '../../common'

const userSchema = new mongoose.Schema<IUser>({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:String,
    password:String,
    confirmPassword:String,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    profilepic:{
        type:[String]
    },
    gender:{
        type:Number,
        default:genderEnum.Male
    },
    role:{
        type:Number,
        default:roleEnum.user
    },
    provider:{
        type:Number,
        default:providerEnum.System
    }
},{
    timestamps:true
})

userSchema.virtual('userName').set(function(userName){
    let [firstName,lastName] = userName.split(' ')
    this.firstName = firstName
    this.lastName = lastName
}).get(function(){
    return `${this.firstName} ${this.lastName}`
})

const userModel = mongoose.model<IUser>('user',userSchema)

export default userModel