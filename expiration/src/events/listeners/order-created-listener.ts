import { Listener, OrderCreateEvent, Subjects } from '@js-ecommerceapp/common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import { expirationQueue } from '../../queues/expiration-queue'
export class OrderCreatedListener extends Listener<OrderCreateEvent> {

  subject: Subjects.OrderCreated = Subjects.OrderCreated
  queueGroupName = queueGroupName


  async onMessage(data: OrderCreateEvent['data'], msg: Message) {

    const delay = new Date(data.expiresAt).getTime()- new Date().getTime()
    console.log('Waiting this many milliseconds to process the job', delay)
    await expirationQueue.add({
      orderId: data.id
    },{
      delay
    })

    msg.ack()
  }

}