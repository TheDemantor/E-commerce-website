// import products from './products'
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Col, Row, ListGroup,Card, Button, Form } from 'react-bootstrap';
import { useParams, Link , useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from './components/rating'
// import axios from 'axios';
import { useGetProductsDetailsQuery } from "./slices/productApiSlice";
import { addToCart } from './slices/cartSlice';
import Message from "./components/Message";
import Loading from "./components/Loading";

const SingleItem = ()=> {
  // const item = products.find((p) => p._id === itemId);
  
  const { id: itemId } = useParams();
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //USING CONTEXT API
  // const [item, setItem] =useState({});
  
  // useEffect(()=>{
    //   const fetchItem = async ()=>{
      //       const { data } = await axios.get(`/api/products/${itemId}`);
      //       setItem(data);
  //   };
  //   fetchItem();
  // },[itemId]);

  //USING REDUX 
  const {data: item, isLoading, error} = useGetProductsDetailsQuery(itemId);
  
  const addToCartHandler = () => {
      dispatch(addToCart({...item, qty}));
      navigate('/cart')
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div>
      <Link to='/items/:id' className='btn btn-light my-3' style={{position: "absolute", left: "0px"}}><Button variant="outline-dark">       
        Go back</Button>
      </Link>

      {isLoading? (
         <Loading/>
        ): error? (
          <Message variant="danger"> { error.data?.massage || error.status } </Message>
        ) : (
      <Row id='productSpace'>
        <Col md={5} id='productPresentation'>
          <Carousel showThumbs infiniteLoop axis='vertical'> 
            <div>
              <img alt="" src="/images/itemImages/1.jpg" />
            </div>
            <div>
              <img alt="" src="/images/itemImages/2.jpg" />
            </div>
            <div>
              <img alt="" src="/images/itemImages/3.jpg" />
            </div>

          </Carousel>
        </Col>
        <Col md={4} id='productDetails'>
          {/* <Row > */}
            
              <ListGroup variant='flush' className='text-left'>
                <ListGroup.Item >
                  <h2>{item.name}</h2>
                  <h6>{item.brand}</h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price: {item.pricing}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Fabric: {item.cloth}
                </ListGroup.Item>
                <ListGroup.Item>
                  {item.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={item.rating} text={item.reviewCount}/>
                </ListGroup.Item>
              </ListGroup>
            
        </Col>
        <Col md={3} id='itemCart'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>{item.pricing}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col><strong>{item.in_stock > 0 ? "In stock": "Out of stock"}</strong></Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant='flush'>
            {item.in_stock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Qty: </Col>
                  <Col>
                    <Form.Control 
                      as='select' 
                      value={qty}
                      onChange={(e)=> setQty(Number(e.target.value))} >
                        {[...(Array(item.in_stock).keys())].map((x)=> (
                          <option key={x+1} value={x+1}>
                              {x+1}
                          </option>
                        ))}
                      </Form.Control>
                      {/* {console.log([...Array(item.in_stock).keys()])} */}
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
              <ListGroup.Item>
                <Row>
                  <Button className="btn-block" type="button" disabled={item.in_stock===0} variant="warning" onClick={() => addToCartHandler()}>Add to cart</Button>
                  <Button className="btn-block my-1" type button disabled={item.in_stock===0} variant="outline-success" onClick={checkoutHandler}>Buy Now</Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        {/* </Row> */}
      </Row>
      )}
      
    </div>
  )
}
export default SingleItem