// import products from './products'
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Col, Row, ListGroup, Card, Button, Form, Image } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/rating'
// import axios from 'axios';
import { useGetProductsDetailsQuery, useCreateReviewMutation } from "../slices/productApiSlice";
import { addToCart } from '../slices/cartSlice';
import Message from "../components/Message";
import Loading from "../components/Loading";
import { toast } from 'react-toastify';


const SingleItem = () => {
  // const item = products.find((p) => p._id === itemId);

  const { id: itemId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

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

  const addToCartHandler = () => {
    dispatch(addToCart({ ...item, qty }));
    navigate('/cart')
  }
  const { data: item, refetch, isLoading, error } = useGetProductsDetailsQuery(itemId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        itemId,
        rating,
        comment,
        user: userInfo
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      console.log(err.error)
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div >
      <Link to='/items/' className='btn gb-btn btn-light my-3' ><Button variant="outline-dark">
        Go back</Button>
      </Link>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"> {error.data?.massage || error.status} </Message>
      ) : (
        <>

          <Row className='productSpace'>
            <Col md={4} id='productPresentation'>
              {/* <Carousel showThumbs infiniteLoop axis='vertical'> 
              <div>
                <img alt="" src="/images/itemImages/1.jpg" />
              </div>
              <div>
                <img alt="" src="/images/itemImages/2.jpg" />
              </div>
              <div>
                <img alt="" src="/images/itemImages/3.jpg" />
              </div>

            </Carousel> */}
              <Image src={item.image} alt={item.name} fluid rounded />

            </Col>
            <Col md={5} id='productDetails'>
              {/* <Row > */}

              <ListGroup variant='flush' className='text-left'>
                <ListGroup.Item >
                  <h2>{item.name}</h2>
                  <h6>{item.brand}</h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:  ₹{item.pricing}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Fabric: {item.cloth}
                </ListGroup.Item>
                <ListGroup.Item>
                  {item.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={item.rating} text={item.reviewCount} />
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
                      <Col><strong>{item.in_stock > 0 ? "In stock" : "Out of stock"}</strong></Col>
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
                            onChange={(e) => setQty(Number(e.target.value))} >
                            {[...(Array(item.in_stock).keys())].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
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
                      <Button className="btn-block" type="button" disabled={item.in_stock === 0} variant="warning" onClick={() => addToCartHandler()}>Add to cart</Button>
                      <Button className="btn-block my-1" type="button" disabled={item.in_stock === 0} variant="outline-success" onClick={checkoutHandler}>Buy Now</Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            {/* </Row> */}
          </Row>
          <Row>
            <Col md={7} className='text-left px-4'>
                <h2>Reviews</h2>
                {item.review.length === 0 && <Message>No Reviews</Message>}
                <ListGroup  >
                  {item.review.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  
                </ListGroup>
            </Col>
            <Col md={5}>
              <h2>Write a Customer Review</h2>

              {loadingProductReview && <Loading />}

              {userInfo ? (
                <Form onSubmit={submitHandler} className='text-left p-4'>
                  <Form.Group className='my-2' controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className='my-2' controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='3'
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type='submit'
                    variant='primary'
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link> to write a review
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}

          </div>
          )
}
          export default SingleItem