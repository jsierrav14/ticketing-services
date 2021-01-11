import {OrderCreateEvent, OrderStatus} from '@js-ecommerceapp/common'
import mongoose from 'mongoose'
import {Message} from 'node-nats-streaming'
import { OrderCreatedListener } from '../order-created-listener';
import { Order } from '../../../models/order';
import {natsWrapper} from '../../../nats.wrapper'

const setup = async() =>{
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data : OrderCreateEvent['data'] ={
           id:mongoose.Types.ObjectId().toHexString(),
           version:0,
           expiresAt:'ASERASDAS',
           userId:'alsadasda',
           status:OrderStatus.Created,
           ticket:{
               id:'asdadsfsd',
               price:10
           }
    }

    //@ts-ignore

    const msg:Message = {
        ack:jest.fn()
    }

    return {listener,data,msg}
}

it('Replicater the order info', async()=>{
    const {listener, data, msg} = await setup();
    await listener.onMessage(data,msg)

    const order = await Order.findById(data.id)

    expect(order!.price).toEqual(data.ticket.price)


})

it('ack the message', async()=>{
    const {listener,data,msg} = await setup();

    await listener.onMessage(data,msg)

    expect(msg.ack).toHaveBeenCalled()
})