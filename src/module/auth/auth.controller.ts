<<<<<<< HEAD
import { Router, type Request, type Response } from "express";
import authService from "./auth.service";
import { successResponce } from "../../common/exceptions/successresponce";
import { auth, userRequest } from "../../middleware/auth.middleware";
import { checkRole } from "../../middleware/checkRole.middleware";
import { uploadFile } from "../../common/utils/multer/cloud";
import { MulterStorageEnums } from "../../common";
import { validation } from "../../common/service/validation";
import { signupSchema } from "./auth.validation";


const router:Router = Router()

router.post('/signup', uploadFile({storageType:MulterStorageEnums.diskStorage}).single('file'),validation(signupSchema),async (req:Request,res:Response)=>{
    let data = await authService.signup(req.body,req.file as Express.Multer.File)
    successResponce({res,message:'signned up successfully',data:data})
})

router.get('/getS3URL/:name',async (req:Request,res:Response)=>{
    let data = await authService.gets3url(req.params.name as string)
    successResponce({res,message:'url created successfully',data:data})
})

router.post('/login',async (req:Request,res:Response)=>{
    let data = await authService.login(req.body)
    successResponce({res,message:'logged in successfully',data:data})
})

router.post('/verify-acc',async (req:Request,res:Response)=>{
    let data = await authService.verify(req.body)
    successResponce({res,message:'account veryfied successfully',data:data})
})

router.post('/verify' ,auth,checkRole(['1','0']),async(req:userRequest,res:Response)=>{
    // console.log(req.user)
    
    // let data = await authService.login(req.body)
    successResponce({res,message:'logged in successfully'})
})

=======
import { Router, type Request, type Response } from "express";
import authService from "./auth.service";
import { successResponce } from "../../common/exceptions/successresponce";
import { auth, userRequest } from "../../middleware/auth.middleware";
import { checkRole } from "../../middleware/checkRole.middleware";
import { uploadFile } from "../../common/utils/multer/cloud";
import { MulterStorageEnums } from "../../common";
import { validation } from "../../common/service/validation";
import { signupSchema } from "./auth.validation";


const router:Router = Router()

router.post('/signup', uploadFile({storageType:MulterStorageEnums.diskStorage}).single('file'),validation(signupSchema),async (req:Request,res:Response)=>{
    let data = await authService.signup(req.body,req.file as Express.Multer.File)
    successResponce({res,message:'signned up successfully',data:data})
})

router.get('/getS3URL/:name',async (req:Request,res:Response)=>{
    let data = await authService.gets3url(req.params.name as string)
    successResponce({res,message:'url created successfully',data:data})
})

router.post('/login',async (req:Request,res:Response)=>{
    let data = await authService.login(req.body)
    successResponce({res,message:'logged in successfully',data:data})
})

router.post('/verify-acc',async (req:Request,res:Response)=>{
    let data = await authService.verify(req.body)
    successResponce({res,message:'account veryfied successfully',data:data})
})

router.post('/verify' ,auth,checkRole(['1','0']),async(req:userRequest,res:Response)=>{
    // console.log(req.user)
    
    // let data = await authService.login(req.body)
    successResponce({res,message:'logged in successfully'})
})

>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
export default router