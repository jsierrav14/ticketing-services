import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus } from '@js-ecommerceapp/common';
import express, {Request, Response} from 'express'
import { Order } from '../models/order';
import {stripe} from '../stripe'



export class PaymentsController {



    async newPayment(req:Request, res:Response){

        const {token, orderId} = req.body;

        const order = await Order.findById(orderId)

        if(!order){
            throw new NotFoundError()
        }

        if(order.userId !== req.currentUser!.id){
            throw new NotAuthorizedError()
        }


        if(order.status === OrderStatus.Cancelled){
            throw new BadRequestError("Cannot pay for an cancelled order")
        }
        await stripe.charges.create({
            currency:'usd',
            amount:order.price*100,
            source:token
        })

        res.status(201).send({success:true})
    }


}