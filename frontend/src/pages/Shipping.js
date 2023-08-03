import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAdd } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {
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
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter street address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter your city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter postalCode'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
                Continue
            </Button>

        </Form>
    </FormContainer>
  )
}

export default Shipping