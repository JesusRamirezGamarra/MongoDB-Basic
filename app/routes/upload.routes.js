import  { Router } from 'express';
import uploadController from '../controllers/upload.controllers.js'

const router = Router();

const path = 'upload'

router.post( `/${path}`, 
    uploadController.upload,
    uploadController.uploadFile
)



export default router;