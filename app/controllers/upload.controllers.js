import uploader from '../middleware/multer.js'

export const  controller ={

    uploadFile : (req,res)=>{
        res.send({data: `Enviar un archivo`})
    },
    upload: uploader.single('file')
}

export default controller    