import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal/UPI/COD');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state)=> state.cart);
  const { shippingAdd } = cart;

  useEffect(()=> {
    if(!shippingAdd){
      navigate('/shipping')
    }
  }, [navigate, shippingAdd]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <h1 className="text-lg font-semibold mb-2">Payment Method:</h1>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select method</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                name="paymentMethod"
                value="UPI/COD"
                checked={paymentMethod === 'UPI/COD'}
                onChange={(e)=>setPaymentMethod(e.target.value)}
              />
              UPI/Cash on delivery
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2"
                name="paymentMethod"
                value="Paypal"
                checked={paymentMethod === 'Paypal'}
                onChange={(e)=>setPaymentMethod(e.target.value)}
              />
              PAYPAL
            </label>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">Pay</button>
      </form>
    </div>
  );
}