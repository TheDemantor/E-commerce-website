import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Col, Row, ListGroup,Card, Button } from 'react-bootstrap';
import { useParams, Link  } from 'react-router-dom';
// import products from './products'
import Rating from './components/rating'
import axios from 'axios';

const SingleItem = ()=> {
  const [item, setItem] =useState({});

  const { id: itemId } = useParams();
  
  // const item = products.find((p) => p._id === itemId);
  useEffect(()=>{
    const fetchItem = async ()=>{
        const { data } = await axios.get(`/api/products/${itemId}`);
        setItem(data);
    };
    fetchItem();
  },[itemId]);


  return (
    <>
      <Link to='/items/:id' className='btn btn-light my-3' style={{float:"left"}}><Button variant="outline-dark">       
        Go back</Button></Link>
      <Row id='productSpace'>
        <Col md={6} id='productPresentation'>
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
        <Col md={6} id='productDetails'>
          <Row >
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{item.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={item.rating} text={item.reviewCount}/>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: {item.pricing}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>
          <Row id='itemCart'>
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
            </Card>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Button className="btn-block" type button disabled={item.in_stock===0} variant="warning">Add to cart</Button>
                    <Button className="btn-block my-1" type button disabled={item.in_stock===0} variant="outline-success">Buy Now</Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>
        </Col>
      </Row>
    </>
  )
}
export default SingleItem