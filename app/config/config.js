import dotenv from 'dotenv';
import minimist from "minimist";

const MONGO_URL ='mongodb+srv://coderhouse:Mishina2000@coderhouse-cluster-ljrg.qaohzev.mongodb.net/CoderHouse-Login-Passport?retryWrites=true&w=majority'
const MONGO_USER =''

const {
    MODE,
    PORT,
    MODO,
    _
}= minimist(process.argv.slice(2),
            {
                alias:{e:"MODE",p:"PORT",m:"MODO"},
                default:{e:'DEV',p:8080,m:"FORK"}
            }
)
// console.log({ARGV:process.argv})
// console.log({MODE:MODE})
// console.log({PORT:PORT})
// console.log({PORT:MODO})

dotenv.config({
    path:MODE.toUpperCase()==="PROD"?  './.env.production': './.env.development'
});



export default {
    init:{
        MODE:process.env.MODE||MODE||'DEV',
        PORT:process.env.PORT||PORT||'8080',
        MODO:process.env.MODO||MODO||'FORK',        
        // MODO:process.env.DEBUG||'false'||'true',        
    },
    app:{
        MODE:process.env.MODE||'DEV',
        DEBUG:process.env.DEBUG||false,
        // PORT:process.env.PORT||8080,        
    },
    mongo:{
        MONGO_URL:process.env.MONGO_URL||MONGO_URL||'undifined',
        MONOG_USER:process.env.MONGO_USER||MONGO_USER||'undifined',
    }
}


