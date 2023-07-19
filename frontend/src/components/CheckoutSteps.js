import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='mb-4'>
        <Nav.Item>
            {step1? (
                <Link to='/login'>
                    <Nav.Link>Sing In</Nav.Link>
                </Link>
             ) : (
                <Nav.Link disabled>Sing In</Nav.Link>
              )}
        </Nav.Item>
        <Nav.Item>
            {step2? (
                <Link to='/shipping'>
                    <Nav.Link>/ Shipping</Nav.Link>
                </Link>
             ) : (
                <Nav.Link disabled>/ Shipping</Nav.Link>
              )}
        </Nav.Item>
        <Nav.Item>
            {step3? (
                <Link to='/payment'>
                    <Nav.Link>/ Payment</Nav.Link>
                </Link>
             ) : (
                <Nav.Link disabled>/ Payment</Nav.Link>
              )}
        </Nav.Item>
        <Nav.Item>
            {step4? (
                <Link to='/placeorder'>
                    <Nav.Link>/ Place order</Nav.Link>
                </Link>
             ) : (
                <Nav.Link disabled>/ Place order</Nav.Link>
              )}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps