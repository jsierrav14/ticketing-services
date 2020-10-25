import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import TicketController from '../controllers/ticket'
import {requireAuth,validateRequest} from '@js-ecommerceapp/common'
const router = express.Router();

const ticketController = new TicketController();

router.post('/api/tickets',requireAuth,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({gt:0}).withMessage('Price is must than zero')
],validateRequest,ticketController.newTicket)

export {router as createTicketRouter}

