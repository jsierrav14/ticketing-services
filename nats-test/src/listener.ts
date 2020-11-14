import nats,{Message, Stan} from 'node-nats-streaming'
import {randomBytes} from 'crypto'
import {TicketCreatedListener} from './events/ticket-create-listener'

console.clear()

const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
url:'http://localhost:4222'
})
stan.on('connect',()=>{
    console.log('Listener connected')
    stan.on('close',()=>{
        console.log('nats close')
        process.exit()
    })

    new TicketCreatedListener(stan).listen();
})

process.on('SIGNIN',()=>{
    stan.close()
})
process.on('SIGNTERM',()=>{
    stan.close()
})
