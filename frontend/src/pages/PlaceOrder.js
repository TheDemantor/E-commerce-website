import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Loading from '../components/Loading';
import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCart } from '../slices/cartSlice';

export default function PlaceOrder() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=> state.cart);
    const user = useSelector((state)=> state.auth);

    const [createOrder, {isLoading, error }] = useCreateOrderMutation();

    useEffect(()=>{
        if(!cart.shippingAdd.address){
            navigate('/shipping');
        } else if (!cart.paymentMethod){
            navigate('/payment');
        }
    }, [navigate, cart.shippingAdd.address, cart.paymentMethod]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                user: user.userInfo._id,
                orderItem: cart.cartItems,
                shippingAdd: cart.shippingAdd, 
                paymentMethod: cart.paymentMethod,
                itemPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();

            dispatch(clearCart());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Place Order</h2>
      <CheckoutSteps step1 step2 step3 step4/>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 w-full">
          <ul className="mb-5 space-y-4">
            <li className="border-b pb-4">
              <h3 className="font-bold mb-1">Shipping</h3>
              <p>
                <strong>Address: </strong>
                {cart.shippingAdd.address}, {cart.shippingAdd.city}, {cart.shippingAdd.postalCode}, {cart.shippingAdd.country}
              </p>
            </li>
            <li className="border-b pb-4">
              <h3 className="font-bold mb-1">Payment</h3>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </li>
            <li>
              <h3 className="font-bold mb-1">{`Order Items [${cart.cartItems.length}]`}</h3>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.cartItems.map((item, index) => (
                    <li key={index} className="flex items-center py-2">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                      <div className="flex-1">
                        <Link to={`/products/${item.product}`} className="font-semibold hover:underline">
                          {item.name}
                        </Link>
                      </div>
                      <div className="w-32 text-right">
                        {item.qty} X ₹{item.pricing} = ₹{item.qty*item.pricing}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="md:w-1/3 w-full">
          <div className="bg-gray-50 rounded shadow p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="mb-2 flex justify-between"><span>Item price :</span><span>₹{cart.itemsPrice}</span></div>
            <div className="mb-2 flex justify-between"><span>Shipping price :</span><span>₹{cart.shippingPrice}</span></div>
            <div className="mb-2 flex justify-between"><span>Tax price :</span><span>₹{cart.taxPrice}</span></div>
            <div className="mb-2 flex justify-between font-bold"><span>Total price :</span><span>₹{cart.totalPrice}</span></div>
            { error && <Message variant='danger'>{ error.data?.message || error.error } </Message> }
            { error && console.log(error.data?.stack || error.error) }
            <button 
              type="button" 
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 mt-4"
              disabled={cart.cartItems.length===0} 
              onClick={ placeOrderHandler }>
              Place Order
            </button>
            { isLoading && <Loading/>}
          </div>
        </div>
      </div>
    </div>
  );
}