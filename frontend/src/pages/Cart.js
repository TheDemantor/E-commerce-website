import React from 'react'
import { addToCart, deleteFromCart } from '../slices/cartSlice'
import { useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
// import Color from 'color';


const Cart = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const  cart = useSelector((state)=> state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({...item, qty}));
  }
  
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const removeFromCartHandler = async (id) => {
    dispatch(deleteFromCart(id))
  }
  return (
    <Row className='mx-5 my-3 text-left'>
      <Col  md={8}>
          <h1 style={{marginBottom: "2rem", color: "firebrick"}}>Your Shopping Bag</h1>
          { cartItems.length===0? (
            <Message >
              Shopping bag is empty ! ! ! <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {/* {console.log(cartItems)} */}
              {cartItems.map((item)=>(
                <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded/>
                      </Col>
                      <Col md={3} className='text-left'>
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>₹{item.pricing}</Col>
                      <Col md={3}>
                          <Form.Control 
                          as='select' 
                          value={item.qty}
                          onChange={(e)=> addToCartHandler(item, Number(e.target.value))} >
                            {[...(Array(item.in_stock).keys())].map((x)=> (
                              <option key={x+1} value={x+1}>
                                  {x+1}
                              </option>
                            ))}
                          </Form.Control>
                      </Col>
                      <Col md={2}>
                          <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item._id)}><FaTrash/></Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
              ))}
            </ListGroup>
          )}
      </Col>
      <Col md={4}>
          <Card >
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>
                  Subtotal of ({cartItems.reduce((acc, item)=> acc+item.qty,0)}) items :
                </h3>
                ₹{cartItems.reduce((acc, item)=> acc+item.qty*item.pricing, 0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button type='button' className="btn-block" onClick={checkoutHandler} disabled={cartItems.length===0}>Proceed to checkout</Button>
              </ListGroupItem>
            </ListGroup>
              {}
          </Card>
      </Col>
    </Row>
  )
}

export default Cart