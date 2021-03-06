import mongoose from 'mongoose';
import app from './app'
import { OrderCreatedListener } from './events/listener/order-created-listener';
import {OrderCancelledListener} from './events/listener/order-cancelled-listener'
import { natsWrapper } from './nats.wrapper'
const start = async () => {

    if (!process.env.jwt) {
        throw new Error('JWT must be defined')
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined')
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined')
    }
    
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined')
    }




    try {


        await natsWrapper.connect("ticketing", "xxxxx", "http://nats-srv:4222")

        natsWrapper.client.on('close', () => {
            console.log('nats close')
            process.exit()
        })

        process.on('SIGIN', () => {
            natsWrapper.client.close()
        })
        process.on('SIGTERM', () => {
            natsWrapper.client.close()
        })

        new OrderCreatedListener(natsWrapper.client).listen()
        new OrderCancelledListener(natsWrapper.client).listen()
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: false,
            useUnifiedTopology: true,
            useFindAndModify: true,
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