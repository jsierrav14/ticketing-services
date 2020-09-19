import mongooge from 'mongoose'

const userSchema = new mongooge.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})
const User = mongooge.model('User',userSchema);


export {User}