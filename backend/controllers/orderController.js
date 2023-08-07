import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js'


// @desc   Create a new order
// @route  POST /api/orders
// @access Priavte
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        user,
        orderItem,
        shippingAdd,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    if (orderItem && orderItem.length == 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // console.log(req.user);
        const order = new Order({
            // user:req.user._id,
            user,
            orderItem: orderItem.map((x) => ({
                ...x,
                price:x.pricing,
                product: x._id,
                _id: undefined
            })),
            shippingAdd,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    // const orders = await Order.find({ user: req.user._id });
    // console.log(req.query)
    const orders = await Order.find({ user: req.query.id });
    res.json(orders);
  });

// @desc   Get order by id
// @route  GET /api/orders/:id
// @access Priavte
const getOrderById = asyncHandler(async (req, res) => {
    // console.log(req.params.id);
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    //populate is used to get some data that is stored in some other collection

    // console.log("this is req");
    // console.log("this is req ends");
    // console.log("i came to order contoller");
    if (order) {
        res.json(order);
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
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
  
      const updatedOrder = await order.save();
  
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
  
      const updatedOrder = await order.save();
  
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
})

// @desc   Get all orders to admin
// @route  Get /api/orders
// @access Priavte/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);   
})



export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}
