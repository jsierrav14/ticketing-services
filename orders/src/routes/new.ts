import express, {Request,Response} from 'express'
import mongoose from 'mongoose'
import {body} from 'express-validator'
import {requireAuth,validateRequest} from '@js-ecommerceapp/common'
import OrdersController from '../controllers/orders.controllers';
const router = express.Router();

const ordersController  = new OrdersController();
router.post('/api/orders',
 requireAuth,
 [
     body('ticketId').not().isEmpty().custom((input:string)=>mongoose.Types.ObjectId.isValid(input)).withMessage('Ticket Id must be provided'),   
 ],
 validateRequest,
 ordersController.new
)

export {router as newOrderRouter}