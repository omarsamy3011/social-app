import mongoose, { Types } from 'mongoose'
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
    },
    friends:[{
        type:Types.ObjectId,
        ref:'user'
    }],
    friendrequests:[{
        type:Types.ObjectId,
        ref:'user'
    }],
    groups:[{
        type:Types.ObjectId,
        ref:'chat'
    }]
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })

userSchema.virtual('userName').set(function(this,userName){
    let [firstName,lastName] = userName.split(' ')
    this.firstName = firstName
    this.lastName = lastName
}).get(function(this){
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
})

const userModel = mongoose.model<IUser>('user',userSchema)

export default userModel