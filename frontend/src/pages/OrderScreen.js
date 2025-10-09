import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loading';
import {
useGetOrderDetailsQuery,
usePayOrderMutation,
useGetPaypalClientIdQuery,
useDeliverOrderMutation

} from '../slices/orderApiSlice';


export default function OrderScreen() {
const { id: orderId } = useParams();

const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

const { userInfo } = useSelector((state) => state.auth);

useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);


  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

//   TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();

    toast.success('Order is paid');
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
};

return (
isLoading ? <Loader />
: error ? <Message variant="danger">{error.data.message}</Message> : (
<div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
  <h2 className="text-2xl font-bold mb-6">Order Details</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div>
      <h3 className="text-lg font-semibold mb-2">Shipping</h3>
      <p><strong>Name:</strong> {order.user.name}</p>
      <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`} className="underline">{order.user.email}</a></p>
      <p><strong>Address:</strong> {order.shippingAdd.address}, {order.shippingAdd.city} {order.shippingAdd.postalCode}, {order.shippingAdd.country}</p>
      {order.isDelivered ? (
        <Message variant='success' className="mt-2">
          Delivered on {order.deliveredAt}
        </Message>
      ) : (
        <Message variant='danger' className="mt-2">Not Delivered</Message>
      )}
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
      <p><strong>Method:</strong> {order.paymentMethod}</p>
      {order.isPaid ? (
        <Message variant='success' className="mt-2">Paid on {order.paidAt}</Message>
      ) : (
        <Message variant='danger' className="mt-2">Not Paid</Message>
      )}
    </div>
  </div>

  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4">Order Items</h3>
    <ul className="divide-y divide-gray-200">
      {order.orderItem.map((item, index) => (
        <li key={index} className="py-4 flex items-center">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
          <div className="flex-1">
            <a href={`/product/${item.product}`} className="font-semibold hover:underline">{item.name}</a>
            <div>{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</div>
          </div>
        </li>
      ))}
    </ul>
  </div>

  <div className="mt-10 flex justify-between items-center">
    <div>
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div><span>Items:</span> <span>₹{order.itemPrice}</span></div>
        <div><span>Shipping:</span> <span>₹{order.shippingPrice}</span></div>
        <div><span>Tax:</span> <span>₹{order.taxPrice}</span></div>
        <div><span>Total:</span> <span>₹{order.totalPrice}</span></div>
      </div>
    </div>

    {order.paymentMethod==="UPI/COD" &&( <h6 className="text-lg font-semibold mb-4">Pay Now</h6>)}

    {!order.isPaid && (
      <div>
        {loadingPay && <Loader />}
        {isPending ? (
          <Loader />
        ) : (
          <div>
            {/* {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
            {/* <Button
              style={{ marginBottom: '10px' }}
              onClick={onApproveTest}
            >
              Test Pay Order
            </Button> */}

            <div>
              <PayPalButtons style={{ layout: "horizontal" }}
                disabled={false}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              ></PayPalButtons>
            </div>
          </div>
        )}
      </div>
    )}

    {loadingDeliver && <Loader />}
    
    {userInfo &&
      userInfo.isAdmin &&
      !order.isPaid && (
        <div>
          <button
            type='button'
            className='btn btn-block'
            onClick={onApproveTest}
          >
            Mark As paid by COD
          </button>
        </div>
      )}
    {userInfo &&
      userInfo.isAdmin &&
      order.isPaid &&
      !order.isDelivered && (
        <div>
          <button
            type='button'
            className='btn btn-block'
            onClick={deliverHandler}
          >
            Mark As Delivered
          </button>
        </div>
      )}
  </div>
</div>
)
)
}