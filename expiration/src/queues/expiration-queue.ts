import Queue from 'bull'
import {ExpirationCompletePublisher} from '../events/publishers/expiration-complete-publisher'
import {natsWrapper} from '../nats.wrapper'

interface Payload {
    orderId: string
}
const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOSTS
    }
})


expirationQueue.process((job,done) => {

    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId:job.data.orderId
        
    })

    done();
})

export { expirationQueue }