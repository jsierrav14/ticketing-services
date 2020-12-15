import request from 'supertest'
import {Ticket} from '../../models/ticket.model'
import app from '../../app'

it('fetch orders', async ()=>{
    const ticket = Ticket.build({
        title:'Concert',
        price:20
    })


    await ticket.save();

    const user = global.signin()

   const {body:order} =  await request(app).
    post('/api/orders').
    set('Cookie',user).
    send({ticketId:ticket.id}).
    expect(201)

  const {body:fetchedOrder} = await request(app).get(`/api/orders/${order.id}`).set('Cookie',user).send().expect(200)

  expect(fetchedOrder.id).toEqual(order.id)

})

it('returns an error if one user tries to fetch another user order', async ()=>{
    const ticket = Ticket.build({
        title:'Concert',
        price:20
    })


    await ticket.save();

    const user = global.signin()

   const {body:order} =  await request(app).
    post('/api/orders').
    set('Cookie',global.signin()).
    send({ticketId:ticket.id}).
    expect(201)

  const {body:fetchedOrder} = await request(app).get(`/api/orders/${order.id}`).set('Cookie',user).send().expect(401)

})