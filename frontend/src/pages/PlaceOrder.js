import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Loading from '../components/Loading';
import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCart } from '../slices/cartSlice';

const PlaceOrder = () => {
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
            // console.log(user);
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
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={7}>
                <ListGroup variant="flush" className="mx-2 mb-5 text-left">
                    <ListGroup.Item>
                        <h3>Shipping</h3>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAdd.address}, {cart.shippingAdd.city}, {cart.shippingAdd.postalCode}, {cart.shippingAdd.country}
                        </p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h3>Payment</h3>
                        
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h3>{`Order Items [${cart.cartItems.length}]`}</h3>
                           {cart.cartItems.length === 0 ? (
                                   <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col >
                                                    <Link to={`/products/${item.product}`}>
                                                        {item.name} 
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                        {item.qty} X ₹{item.pricing} = ₹{item.qty*item.pricing}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>    
                            )
                            }
                        
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4} className="mx-1">
                    <Card>
                        <ListGroup variant="flush" className="text-left">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item price :</Col>
                                    <Col>₹{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping price :</Col>
                                    <Col>₹{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax price :</Col>
                                    <Col>₹{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total price :</Col>
                                    <Col>₹{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                { error && <Message variant='danger'>{ error.data?.message || error.error } </Message> }
                                { error && console.log(error.data?.stack || error.error) }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                type="button" 
                                className="btn-block"
                                disabled={cart.cartItems.length===0} 
                                onClick={ placeOrderHandler }>
                                Place Order
                                </Button>
                                { isLoading && <Loading/>}
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrder