import React from 'react'
import { Container } from 'react-bootstrap'
import Filters from '../components/filters';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import ThumbItem from '../components/thumbItem';
import Loading from "../components/Loading";
import Message from "../components/Message";
// import products from '../products';
// istead we are gonna use useEffect and useSate
// import { useEffect, useState, React} from 'react';
// import axios from 'axios';

//instead we will use redux slices
import { useGetProductsQuery } from "../slices/productApiSlice";

export default function Items() {
  //HERE WE USED CONTEXT API FOR FETCHING DATA ANS MANAGING STATES
  // const [products, setProducts]=useState([]);
  // useEffect(()=>{
  //   const fetchProducts = async ()=>{
  //     const { data } = await axios('/api/products/');
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, [])

  //NOW WE WILL USE REDUx SLICES

  const { keyword = '', ctg = '' } = useParams(); 
  // console.log(keyword, ctg)
  const { data: products, isLoading, error } = useGetProductsQuery({keyword, ctg});
  // console.log(products)
  return (
    <div>
      <Container className='items'>
        <Col className='fliter-section'>
          <h3>Filters</h3>
          <Filters />
        </Col>
        <Col className='item-section'>
          <Row>
            <p>Total Items</p>
          </Row>
          <Row>
            Sort
          </Row>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <Message variant="danger"> {error?.data?.massage || error.error} {console.log(error)}</Message>
              
            ) : (
                <Row>
                  {products.map((product) =>
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <ThumbItem product={product}></ThumbItem>
                    </Col>
                  )}
                </Row>
            )}

        </Col>
      </Container>

    </div>
  )
}
