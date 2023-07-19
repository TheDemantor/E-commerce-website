import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from './components/FormContainer'
import CheckoutSteps from './components/CheckoutSteps'
import { savePaymentMethod } from './slices/cartSlice'

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  
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
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method:</h1>
      <Form onSubmit={ submitHandler }>
        <Form.Group>
          <Form.Label as='legend'>Select method</Form.Label>
          <Col>
            <Form.Check
               type='radio'
               className='my-2'
               label='Paypal or credit card'
               id='Paypal'
               name='paymentMethod'
               value='Paypal'
               checked
               onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' >Continue</Button>
      </Form>

    </FormContainer>
  )
}

export default Payment