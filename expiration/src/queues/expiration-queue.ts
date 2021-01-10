import Queue from 'bull'
interface Payload {
    orderId: string
}
const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOSTS
    }
})


expirationQueue.process((job,done) => {
    console.log('I want to publish an expiration:complete event for orderId', job.data.orderId)

    done();
})

export { expirationQueue }