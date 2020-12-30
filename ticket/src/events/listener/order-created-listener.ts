import {Message} from 'node-nats-streaming'
import {Listener, OrderCreateEvent,Subjects} from '@js-ecommerceapp/common'
import {queueGroupName} from './queue-group-name'
import Ticket from '../../model/Ticket.model'
import {TicketUpdatedPublisher} from '../publisher/ticket-updated-publisher'
import { natsWrapper } from '../../nats.wrapper'
export class OrderCreatedListener extends Listener<OrderCreateEvent>{
 subject:Subjects.OrderCreated = Subjects.OrderCreated

 queueGroupName = queueGroupName;


 async onMessage(data: OrderCreateEvent['data'], msg:Message){

    const ticket = await Ticket.findById(data.ticket.id)

    if(!ticket){
        throw new Error('Ticket not found')
    }

    ticket.set({orderId:data.id})

 
    await ticket.save()

    new TicketUpdatedPublisher(this.client).publish({
        id:ticket.id,
        price:ticket.price,
        title:ticket.title,
        userId:ticket.userId,
        orderId:ticket.orderId,
        version:ticket.version
    })


    msg.ack()
 }

}