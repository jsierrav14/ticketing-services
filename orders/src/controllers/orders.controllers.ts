import { Response, Request } from 'express'
import { Ticket } from '../models/ticket.model'
import { Order,OrderStatus } from '../models/order.model'
import { BadRequestError, NotAuthorizedError, NotFoundError } from '@js-ecommerceapp/common';
import {OrderCreatedPublisher} from '../events/publishers/order-created-publisher'
import {OrderCancelledPublisher} from '../events/publishers/order-cancelled-publisher'
import { natsWrapper } from '../nats.wrapper';

const EXPIRATION_WINDOW_SECONDS = 1*60
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

        new OrderCreatedPublisher(natsWrapper.client).publish({
            id:order.id,
            status:order.status,
            userId:order.userId,
            expiresAt:order.expiresAt.toISOString(),
            version:order.version,
            ticket:{
                id:ticket.id,
                price:ticket.price
            }
        })

        res.status(201).send(order)


    }
    async getOrders(req:Request,res:Response){

        const orders = await Order.find({
            userId:req.currentUser!.id
        }).populate('ticket')
        
        res.send(orders)
    }
    async showOrder(req:Request, res:Response){
        const order = await Order.findById(req.params.orderId).populate('ticket')
        if(!order){
            throw new NotFoundError()
        }
        
        if(order.userId !== req.currentUser!.id){
          throw new NotAuthorizedError()
        }


        res.send(order)
    }

    async deleteOrder(req:Request,res:Response){


        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate('ticket');
    
       if (!order) {
          throw new NotFoundError();
        }
        
       
       if (order.userId !== req.currentUser!.id) {
          throw new NotAuthorizedError();
        }
       
        
        order.status = OrderStatus.Cancelled;

        await order.save();
        console.log(order)
    
        // publishing an event saying this was cancelled!
   
      new OrderCancelledPublisher(natsWrapper.client).publish({
            id:order.id,
            version:order.version,
            ticket:{
                id:order.ticket.id,
            }
        })
        res.status(204).send(order);
      
    }
}


export default OrdersController;