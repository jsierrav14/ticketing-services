import { Request, Response } from 'express'
import Ticket from '../model/Ticket.model';
import { NotAuthorizedError, NotFoundError } from '@js-ecommerceapp/common';

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

        return res.status(201).send(ticket)


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