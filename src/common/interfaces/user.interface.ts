<<<<<<< HEAD
import { Types } from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../enums/user.enum";


export interface IUser {
    userName:string,
    firstName?:string,
    lastName?:string,
    email:string,
    phone:string,
    password:string,
    confirmPassword:string,
    profilepic?:string[]| undefined,
    confirmEmail?:boolean,
    gender?:genderEnum,
    role?:roleEnum,
    provider?:providerEnum,
    friends:Types.ObjectId,
    friendrequests:Types.ObjectId
=======
import { genderEnum, providerEnum, roleEnum } from "../enums/user.enum";


export interface IUser {
    userName:string,
    firstName?:string,
    lastName?:string,
    email:string,
    phone:string,
    password:string,
    confirmPassword:string,
    profilepic?:string[]| undefined,
    confirmEmail?:boolean,
    gender?:genderEnum,
    role?:roleEnum,
    provider?:providerEnum
>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
}