import express from 'express'
import TicketController from '../controllers/ticket';

const router = express.Router();
const ticketController = new TicketController();
router.get('/api/tickets/:id',ticketController.show)

export {router as showTicketRouter}