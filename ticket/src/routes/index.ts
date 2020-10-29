import express,{Request, Response} from 'express'
import TicketController from '../controllers/ticket';

const router = express.Router();
const ticketControler = new TicketController();
router.get('/api/tickets',ticketControler.list)

export {router as listTicketsRouter}