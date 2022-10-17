import express from 'express';
import bodyParser from "body-parser";
import {initDB_Event,initDB_Promise,initDB_CallBack,initDB_TryCatch} from './app/config/db.js'
import uploadRouters from './app/routes/upload.routes.js'
import userRouters from './app/routes/user.routes.js'
import itemRouters from './app/routes/item.routes.js'
import { ____dirname } from './app/utils/utils.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/',(req,res)=>{
    res.send({
        data:'Hola'
    })
})

app.use(
    bodyParser.json({
        limit:'20mb'
    })
)
app.use(
    bodyParser.urlencoded({
        limit:'20mb',
        extended:true   
    })
)
console.log('express.static : ' , ____dirname + '/public/uploads')
app.use(express.static(____dirname + '/public/uploads' ));
app.use(userRouters)
app.use(itemRouters)
app.use(uploadRouters)

const init = async () => {
    initDB_Promise()
    app.listen(PORT,()=>{
        console.log(`listening on port: ${PORT} -  pid:${process.pid}`)
    })
}
init()