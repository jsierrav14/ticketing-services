import { Response, Request } from 'express'
import { Ticket } from '../models/ticket.model'
import { Order } from '../models/order.model'
import { BadRequestError, NotFoundError, OrderStatus } from '@js-ecommerceapp/common';

const EXPIRATION_WINDOW_SECONDS = 15*60
class OrdersController {



    async new(req: Request, res: Response) {
        const { ticketId } = req.body;
        const ticket = await Ticket.findById(ticketId)

        if (!ticket) {
            throw new NotFoundError()
        }

        const isReserved = await ticket.isReserved();

        if (isReserved) {
            throw new BadRequestError("Ticket is already reserved");
        }


        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)


        const order = Order.build({
            userId: req.currentUser!.id,
            status:OrderStatus.Created,
            expiresAt:expiration,
            ticket
        })

        await order.save();


        res.status(201).send(order)


    }
    async getOrders(req:Request,res:Response){

        const orders = await Order.find({
            userId:req.currentUser!.id
        }).populate('ticket')
        
        res.send(orders)
    }
}


export default OrdersController;