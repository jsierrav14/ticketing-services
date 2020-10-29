import express, { Router } from 'express'
import {body} from 'express-validator'
import TicketController from '../controllers/ticket';
import {requireAuth,validateRequest} from '@js-ecommerceapp/common'
const router = express.Router();
const ticketController = new TicketController();

router.put('/api/tickets/:id',requireAuth,[body('title').not().isEmpty().withMessage('Title is required'),body('price').isFloat({gt:0}).withMessage('price must be provider and must be greater than 0')],validateRequest,ticketController.updateTicket)

export {router as updateRouter}