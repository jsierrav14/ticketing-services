import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticket-create-prublisher'
console.clear()
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {

    const publisher = new TicketCreatedPublisher(stan);
   try {
      await publisher.publish({
        id: '123',
        title: 'concern',
        price: 20
    }) 
   } catch (error) {
       console.log(error)
   } 
    console.log('Publisher connected to NATS')


    /*
    const data =JSON.stringify({
        id:'123',
        tile:'Concert',
        price:'20'
    })

    stan.publish('ticket:created',data, ()=>{
        console.log('Event published')
        
    })*/

})

