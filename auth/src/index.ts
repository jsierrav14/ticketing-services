import mongoose from 'mongoose';
import app from './app'

const start = async () => {

    if(!process.env.jwt){
        throw new Error('JWT must be defined')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('connected')
    } catch (err) {
        console.log(err)
    }

}
app.listen(3000, () => {
    console.log('Listen on port 3000!')
});

start()