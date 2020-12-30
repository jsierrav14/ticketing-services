import {OrderCreateEvent, OrderStatus} from '@js-ecommerceapp/common'
import {Message} from 'node-nats-streaming'
import { natsWrapper } from '../../../nats.wrapper'
import {OrderCreatedListener} from '../order-created-listener'
import Ticket from '../../../model/Ticket.model'
import  mongoose  from 'mongoose'

const setup = async()=>{

    const listener = new OrderCreatedListener(natsWrapper.client)


    const ticket = Ticket.build({
        title:'Concert',
        price:99,
        userId:'asas'
    })

    await ticket.save()


    const data:OrderCreateEvent['data'] ={
        id:mongoose.Types.ObjectId().toHexString(),
        version:0,
        status:OrderStatus.Created,
        userId:'asdasd',
        expiresAt:'adsasdad',
        ticket:{
            id:ticket.id,
            price:ticket.price
        }
    }

    //@ts-ignore
    const msg:Message = {
       ack:jest.fn()
    }

    return {listener,ticket,data, msg}
}

it('Sets the userId of the ticket', async()=>{
    const {listener, ticket,data, msg} = await setup()

    await listener.onMessage(data,msg);

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket!.orderId).toEqual(data.id)
})

it('acks the message',async ()=>{
    const {listener, ticket, data, msg} = await setup()
    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})

it('publishes a ticket updated event', async ()=>{
    const {listener, ticket,data, msg} = await setup();

    await listener.onMessage(data,msg)

    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])

    expect(natsWrapper.client.publish).toHaveBeenCalled()
    expect(data.id).toEqual(ticketUpdatedData.orderId)
})