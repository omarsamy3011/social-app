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
}