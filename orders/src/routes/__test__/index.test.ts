import request from 'supertest'
import app from '../../app'
import { Order } from '../../models/order.model'
import { Ticket } from '../../models/ticket.model'


const buildTicket = async () => {
    const ticket1 = Ticket.build({
        title: 'Concert 1',
        price: 201
    })



    await ticket1.save();

    return ticket1;

}

it('fetches order for an particular user', async () => {


    const ticketOne = await buildTicket()
    const tickettwo = await buildTicket()
    const ticketthree = await buildTicket()

    const userOne = global.signin()
    const usertwo = global.signin()

    const { body: orderOne } = await request(app).post('/api/orders').set('Cookie', userOne).send({ ticketId: ticketOne.id }).expect(201)
    const { body: orderTwo } = await request(app).post('/api/orders').set('Cookie', userOne).send({ ticketId: tickettwo.id }).expect(201)
    await request(app).post('/api/orders').set('Cookie', usertwo).send({ ticketId: ticketthree.id }).expect(201)


    const response = await request(app).get('/api/orders').set('Cookie', userOne).expect(200)
    //const {body:orderTwo} = await request(app).get('/api/orders').set('Cookie',userOne).expect(200)

    expect(response.body.length).toEqual(2)
    expect(response.body[0].id).toEqual(orderOne.id)
    expect(response.body[1].id).toEqual(orderTwo.id)
    expect(response.body[0].ticket.id).toEqual(orderOne.ticket.id)
    expect(response.body[1].ticket.id).toEqual(orderTwo.ticket.id)




})