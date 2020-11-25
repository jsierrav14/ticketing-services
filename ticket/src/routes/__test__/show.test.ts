import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../app'

it('Returns a 404 if the ticket is not found',async()=>{
   let id = new mongoose.Types.ObjectId().toHexString()

   console.log(`/api/tickets/${id}`)
    const response = request(app).get(`/api/tickets/${id}`).send()
})


it('Returns the ticket is  found',async()=>{
    const title = "My ticket";
    const price = 22;
    const response = await request(app).post('/api/tickets').set('Cookie',global.signin()).send({
        title,
        price
    }).expect(201)

 
    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.price).toEqual(price)

})