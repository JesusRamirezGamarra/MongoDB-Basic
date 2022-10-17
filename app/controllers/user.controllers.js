import mongoose from 'mongoose';
import userModels from '../models/user.models.js'

const options ={
    page:3,
    limit:3,
    collation:{
        locale:'es',
    },
};

const parseId = (id) =>{
    return mongoose.Types.ObjectId(id)
}

export const  controller ={

    getSingle : (req,res)=>{
        const { id } = req.params;
        userModels.selectOne(
            {_id:parseId(id)},
            (err,docs)=>{
                res.send({
                    item : docs
                })
            }
        )
    },
    updateSingle : (req,res)=>{
        const { id } = req.params;
        const body = req.body;
        userModels.updateOne(
            {_id:parseId(id)},
            body,
            (err,docs)=>{
                res.send({
                    item : docs
                })
            }
        )
    },
    deleteSingle : (req,res)=>{
        const { id } = req.params;
        userModels.deleteOne(
            {_id:parseId(id)},
            (err,docs)=>{
                res.send({
                    item : docs
                })
            }
        )
    },
    
    getData : (req, res)=>{
        //res.send({data:`Esto viene desde User.Routers `})

        userModels.paginate({},options,(err,docs)=>{
        //userModels.find({},(err,docs)=>{
            res.send({
                items : docs
            })
        })
    },

    insertData : (req, res)=>{
        const data = req.body
        console.log({data})
        // userModels.init();
        
        userModels.create(data,(err,docs) =>{
            if(err){
                // console.log({err})
                console.log(err)
            }
            res.send({data:docs})
        })
    },   

    logIn : (req, res)=>{

        const {username,password} = req.body;
        // console.log(' mmmmmmm ');
        // res.send({data:{username,password} })

        // LogInValidate(username,password,(error,success) =>{
        // if(success)
        //     res.send({success})
        // else 
        //     res.send({error})
        // })

        userModels.findOne({username: username})
        .exec( async (error, user) => {
            if (error) {
                res.send({error})
            } else if (!user) {
                res.send({user})
            } else {
                user.comparePassword(password,user.password, 
                    async(matchError, isMatch) => {
                        if (matchError) {
                            res.send({matchError})
                        } else if (!isMatch) {
                            res.send({error})
                        } else {
                            res.send({success:'success'})
                        }
                })
            }
        })     

    }
}



export default controller



    // ,
    // LogInValidate:(username, password, callback)=> {

    //     userModels.findOne({username: username})
    //         .exec( async (error, user) => {
    //             if (error) {
    //             //     res.send({error})
    //                 callback({error: true})
    //             } else if (!user) {
    //                 // res.send({user})
    //                 callback({error: true})
    //             } else {
    //                 // res.send({data:{username,password}})
    //                 // console.log(user)
    //                 user.comparePassword(password,user.password, 
    //                     async(matchError, isMatch) => {
    //                         if (matchError) {
    //                             // console.log({matchError:""})
    //                             callback({error: true})
    //                         } else if (!isMatch) {
    //                             // console.log({isMatch})
    //                             // res.send({error})
    //                             callback({error: true})
    //                         } else {
    //                             // console.log({success:'success'})
    //                             // res.send({success:'success'})
    //                             callback({success: true})
    //                         }
    //                 })
    //             }
    //     })
    // }   