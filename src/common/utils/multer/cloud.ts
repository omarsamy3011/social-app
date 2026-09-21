<<<<<<< HEAD
import multer from 'multer'
import { MulterStorageEnums } from '../../enums/multer.enum'
import {tmpdir} from 'os'

export const uploadFile = ({storageType = MulterStorageEnums.memoryStorage}:
    {storageType?:MulterStorageEnums})=>{

    const storage = storageType==MulterStorageEnums.memoryStorage?multer.memoryStorage():multer.diskStorage({
        destination(req,file,cb){
            cb(null,tmpdir())
        },
        filename(req,file,cb){
            let name = Date.now() + '-' + file.originalname
            cb(null,name)
        }
    })

    return multer({storage})
=======
import multer from 'multer'
import { MulterStorageEnums } from '../../enums/multer.enum'
import {tmpdir} from 'os'

export const uploadFile = ({storageType = MulterStorageEnums.memoryStorage}:
    {storageType?:MulterStorageEnums})=>{

    const storage = storageType==MulterStorageEnums.memoryStorage?multer.memoryStorage():multer.diskStorage({
        destination(req,file,cb){
            cb(null,tmpdir())
        },
        filename(req,file,cb){
            let name = Date.now() + '-' + file.originalname
            cb(null,name)
        }
    })

    return multer({storage})
>>>>>>> b65c5a9db5b3272040cd53c75db599dc68a1675e
}