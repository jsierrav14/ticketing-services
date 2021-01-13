import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import {requireAuth, validateRequest, BadRequestError,NotFoundError} from '@js-ecommerceapp/common'
import {Order} from  '../models/order'
import { PaymentsController } from '../controllers/payments.controller';


const router = express.Router();
const paymentsController = new PaymentsController();
router.post('/api/payments',requireAuth,[body('token').not().isEmpty(),body('orderId').not().isEmpty()],validateRequest, paymentsController.newPayment)

export {router as createChargeRouter}