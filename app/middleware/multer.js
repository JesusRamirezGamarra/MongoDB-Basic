import multer from 'multer'
import {____dirname} from '../utils/utils.js'

// uploadFile= ()=>{
const storage = multer.diskStorage({
    destination: //`./public/uploads`,
    (req,file,callback)=>{
        // console.log(____dirname+'/uploads')
        //callback(null,____dirname+'/uploads')
        callback(null,____dirname+'/public/uploads')
    },
    filename: (req,file,callback)=>{
        // console.log('ssssssssssssssssssssssss')
        // console.log(file)
        // console.log(`${Date.now()}-${file.originalname}`)
        //callback(null,file.fieldname + '-' + Date.now())
        callback(null,`${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({
    storage:storage
})


// }

export default uploader;

