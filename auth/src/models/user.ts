import mongooge from 'mongoose'
import {Password} from '../services/password'


interface UserAttrs {
    email:string,
    password:string
}

interface UserModel extends mongooge.Model<UserDoc> {
    build(attrs:UserAttrs):UserDoc
}

interface UserDoc extends mongooge.Document {
    email:string,
    password:string,
    updateAt:string
}




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

userSchema.pre('save', async function(done){

    if(this.isModified('password')){
     const hashed = await Password.toHash(this.get('password'));
     this.set('password', hashed);
    }

    done();
})

userSchema.statics.build = (attrs:UserAttrs)=>{
    return new User(attrs)
}
const User = mongooge.model<UserDoc, UserModel>('User',userSchema);

export {User}