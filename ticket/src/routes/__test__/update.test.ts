import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../app'
import Ticket from '../../model/Ticket.model'
import {natsWrapper} from '../../nats.wrapper'


const createTicket = async () => {
   
   return await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'New Ticket',
        price: 20
    })
   
}
it('returns a 404 if the provided id doest not exist',async ()=>{
    let id = new mongoose.Types.ObjectId().toHexString();
    await request(app).put(`/api/tickets/${id}`).set('Cookie',global.signin()).send({title:'New',price:23}).expect(404)
   
})

it('returns a 400 if  the user provides an invalid title or price',async ()=>{
    const response = await createTicket();
    console.log(response.body.id)
    const ticketResponse = await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',global.signin()).send({
          price:21
    }).expect(400)
})

it('returns a 401 without authentication',async ()=>{
    const response = await createTicket();
    console.log(response.body.id)
    const ticketResponse = await request(app).put(`/api/tickets/${response.body.id}`).send({
          title:'Nuevo',
          price:21
    }).expect(401)

  
})

it('returns a 401 if the user does not own the ticket',async ()=>{
    const response = await createTicket();

    await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',global.signin()).send({
        title:'wew',
        price:344
    }).expect(401)
    
  
})
it('Can update with a payload',async()=>{

    const cookie = global.signin();
   const response =  await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'New Ticket',
        price: 20
    })
    const ticketResponse = await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({
          title:'Nuevo',
          price:21
    }).expect(200)
  
    const ticket = await request(app).get(`/api/tickets/${response.body.id}`).send();
    expect(ticket.body.title).toEqual('Nuevo')
    expect(ticket.body.price).toEqual(21)

})

it('publishing an event', async()=>{
    const cookie = global.signin();
    const response =  await request(app).post('/api/tickets').set('Cookie', cookie).send({
         title: 'New Ticket',
         price: 20
     })
     const ticketResponse = await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({
           title:'Nuevo',
           price:21
     }).expect(200)

     expect(natsWrapper.client.publish).toHaveBeenCalled()
   
})

it('Rejects updated if the ticket is reserved', async()=>{

    const cookie = global.signin();

    const response =  await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'New Ticket',
        price: 20
    })

    const ticket= await Ticket.findById(response.body.id)
    ticket!.set({orderId: mongoose.Types.ObjectId().toHexString()})

    await ticket!.save()
    const ticketResponse = await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({
          title:'Nuevo',
          price:21
    }).expect(400)



})