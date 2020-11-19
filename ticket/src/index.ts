import mongoose from 'mongoose';
import app from './app'
import {natsWrapper} from './nats.wrapper'
const start = async () => {

    if(!process.env.jwt){
        throw new Error('JWT must be defined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }

    try {
        await natsWrapper.connect('ticketing','xxxxxx','http://nats-srv:4222')
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: false,
            useUnifiedTopology: true,
            useFindAndModify:true,
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