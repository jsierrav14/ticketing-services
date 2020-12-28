import request from 'supertest'
import app from '../../app'
import mongoose from 'mongoose'
import {Ticket} from '../../models/ticket.model'
import {Order, OrderStatus} from '../../models/order.model'
import {natsWrapper} from '../../nats.wrapper'
it('marks an order as cancelled', async () => {
    // create a ticket with Ticket Model
    const ticket = Ticket.build({
      title: 'concert',
      price: 20,
      id:mongoose.Types.ObjectId().toHexString()
    });
    await ticket.save();
  
    const user = global.signin();
    // make a request to create an order
    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);
  
      console.log(order)

    // make a request to cancel the order
    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .send()
      .expect(204);
  
    // expectation to make sure the thing is cancelled
    const updatedOrder = await Order.findById(order.id);
  
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it('Emits a order cancelled event',async ()=>{
    const ticket = Ticket.build({
      title: 'concert',
      price: 20,
      id:mongoose.Types.ObjectId().toHexString()
    });
    await ticket.save();
  
    const user = global.signin();
    // make a request to create an order
    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({ ticketId: ticket.id })
      .expect(201);
  

    // make a request to cancel the order
    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .send()
      .expect(204);
      expect(natsWrapper.client.publish).toHaveBeenCalled()
  })