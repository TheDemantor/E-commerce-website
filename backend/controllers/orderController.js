import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderSchema.js'


// @desc   Create a new order
// @route  POST /api/orders
// @access Priavte
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        user,
        orderItems,
        shippingAdd,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    if (orderItems && orderItems.length == 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // console.log();
        const order = new Order({
            user,
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            shippingAdd,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
})

// @desc   Get orders of logged-in user
// @route  GET /api/orders/myorders
// @access Priavte
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
})

// @desc   Get order by id
// @route  GET /api/orders/:id
// @access Priavte/Admin
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params._id).populate('user', 'name email');
    //populate is used to get some data that is stored in some other collection

    console.log(order);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
})

// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('Update order to paid');
})

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('Update order to delivered');
})

// @desc   Get all orders to admin
// @route  Get /api/orders
// @access Priavte/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('Get all orders');
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}
