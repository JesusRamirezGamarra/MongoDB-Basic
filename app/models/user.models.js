import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';

const collection = "Users";

const usersSchema = new mongoose.Schema({
        email:{
            type: String,
            required: true,
            unique: true,  // Not a bug, you have to understand that unique is an index configuration option in your schema. If your 'users' collection doesn't have a unique index on userName, you need to wait for the index to build before you start relying on it.          
            dropDups: true,
            allowNull: false,
            lowercase: true,
            match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
            // validate : {
            //     validator: async (email)=> {
            //         const user = await this.constructor.findOne({ email });
            //         if(user) {
            //             if(this.id === user.id) {
            //             return true;
            //             }
            //             return false;
            //         }
            //     return true;},
            //     message: props => 'The specified email address is already in use.'
            // }
            // // Optional : https://www.npmjs.com/package/mongoose-unique-validator
        },            
        username: {
            type: String, 
            unique: true,
            required: true,
            allowNull: false,
            lowercase: true
        },    
        name: {
            type: String, 
            required: true,
            allowNull: false
        },    
        avatar:{
            type : String,
            default : 'https://github.com/JesusRamirezGamarra/signature/blob/main/public/img/Logo_Negro.png'
        },
        password:{ 
            type: String, 
            required: true,
            allowNull: false
        }
    },
    {
        versionKey:false,
        timestamps:true
    }

)

usersSchema.path('email').validate( async(email)=>{
    const emailCount = await mongoose.models.Users.countDocuments({ email })
    return !emailCount
},'Email alredy exists')

let SALT_WORK_FACTOR = 10;

usersSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(SALT_WORK_FACTOR, 
            async (saltError, salt) =>{
                if (saltError) {
                    return next(saltError)
                } else {
                    bcrypt.hash(user.password, salt,async (hashError, hash)=> {
                    if (hashError) {
                        return next(hashError)
                    }
                    user.password = hash
                    next()
                    })
            }
        })
    } else {
        return next()
    }
    })

usersSchema.methods.comparePassword = (password,passwordInDB, callback) =>{
    // const user = this
    // console.log(user)
    // console.log({password})
    // console.log({passwordInDB})
    bcrypt.compare(password, passwordInDB, 
        (error, isMatch) => {
            if (error) {
                return callback(error)
            } else {
                callback(null, isMatch)
            }
    })
}

usersSchema.plugin(paginate)

const userService =  mongoose.model(collection,usersSchema);
export default userService;