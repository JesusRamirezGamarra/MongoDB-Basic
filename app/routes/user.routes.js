import  { Router } from 'express';
import userController from '../controllers/user.controllers.js'
//import router from 'express-router';

const router = Router();

const path = 'user'

router.get( `/${path}/:id`, 
        userController.getSingle
)
router.put( `/${path}/:id`, 
        userController.updateSingle
)
router.delete( `/${path}/:id`, 
        userController.deleteSingle
)


router.get( `/${path}`, 
        userController.getData
    //         (req, res) => {
    //             res.send({a:1})
    // }
)

router.post( `/${path}`, 
        userController.insertData
)


router.post( `/${path}/login`, 
        userController.logIn
)



export default router;