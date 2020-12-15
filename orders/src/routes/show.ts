import { requireAuth } from '@js-ecommerceapp/common';
import express, {Request,Response} from 'express'
import OrdersController from '../controllers/orders.controllers';

const router = express.Router();
const orderController = new OrdersController()
router.get('/api/orders/:orderId',requireAuth,orderController.showOrder)

export {router as showOrderRouter}