import  { Router } from 'express';
import itemcontroller from '../controllers/item.controllers.js'
//import router from 'express-router';

const router = Router();

const path = 'item'

router.get( `/${path}`, 
        itemcontroller.getData
    //         (req, res) => {
    //             res.send({a:1})
    // }
)

export default router;