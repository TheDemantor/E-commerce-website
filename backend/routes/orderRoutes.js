import express from 'express';
const router = express.Router();
//FROM CONTROLLER
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

// router.route('/').post(protect,addOrderItems).get(protect, admin, getOrders);
router.route('/').post( addOrderItems).get(getOrders);
router.route('/myorders').get(protect, getMyOrders);
// router.route('/myorders').get( getMyOrders);
router.route('/:id').get(getOrderById);
// router.route('/:id').get(protect,getOrderById);
// router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/pay').put(updateOrderToPaid);
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/deliver').put( updateOrderToDelivered);

export default router;