import { requireAuth } from '@js-ecommerceapp/common';
import express from 'express'
import OrdersController from '../controllers/orders.controllers';

const router = express.Router();
const orderController = new OrdersController()
router.delete('/api/orders/:orderId', requireAuth, orderController.deleteOrder)

export {router as deleteOrderRouter}