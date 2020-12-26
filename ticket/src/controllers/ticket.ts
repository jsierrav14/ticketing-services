import { Request, Response } from 'express'
import Ticket from '../model/Ticket.model';
import { NotAuthorizedError, NotFoundError } from '@js-ecommerceapp/common';
import {natsWrapper} from '../nats.wrapper'
import {TicketCreatedPublisher} from '../events/publisher/ticket-created-publisher'
import {TicketUpdatedPublisher} from '../events/publisher/ticket-updated-publisher'
class TicketController {


    async newTicket (req: Request, res: Response) {

        const { title, price } = req.body;
        const ticket = Ticket.build(
            {
                title,
                price,
                userId:req.currentUser!.id
            }
        )
        await ticket.save()
       await new TicketCreatedPublisher(natsWrapper.client).publish({
             id:ticket.id,
             version:ticket.version,
             title:ticket.title,
             price:ticket.price,
             userId:ticket.userId
         })
      
        res.status(201).send(ticket)
    }

    async updateTicket (req:Request,res:Response){
        const id = req.params.id;
        const {title,price} = req.body;
        const ticket = await Ticket.findById(id)

        if(!ticket){
            throw new NotFoundError();
        }
       if(ticket.userId !== req.currentUser!.id){
            throw new NotAuthorizedError();
        }
       
       ticket.set(
            {
                title,
                price
            }
        )
        await ticket.save();
        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id:ticket.id,
            version:ticket.version,
            title:ticket.title,
            price:ticket.price.toString(),
            userId:ticket.userId

        })

        return res.status(200).send(ticket)


    }
    async show(req:Request,res:Response){
        const ticket = await Ticket.findById(req.params.id);
        console.log(ticket)
        if(!ticket){
            throw new NotFoundError();
        }
        res.send(ticket)
    }


    async list(req:Request, res:Response){
        const tickets = await Ticket.find({})

        res.send(tickets)
    }

}


export default TicketController;