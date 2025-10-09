import React, { useState } from 'react'
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAdd } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

export default function Shipping() {
    const cart = useSelector((state)=>state.cart);
    const { shippingAdd } = cart;
    
    const [address, setAddress] = useState(shippingAdd?.address || '');
    const [city, setCity] = useState(shippingAdd?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAdd?.postalCode || '');
    const [country, setCountry] = useState(shippingAdd?.country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();    


    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAdd({address, city, postalCode, country}));
        navigate('/payment');

    }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Shipping</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <CheckoutSteps step1 step2/>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                    type='text' 
                    id="address"
                    placeholder='Enter street address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                    type='text' 
                    id="city"
                    placeholder='Enter your city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">PostalCode</label>
                <input
                    type='text' 
                    id="postalCode"
                    placeholder='Enter postalCode'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                    type='text' 
                    id="country"
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">Continue</button>
      </form>
    </div>
  );
}