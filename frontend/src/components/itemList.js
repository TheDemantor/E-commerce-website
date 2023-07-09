// import Card from 'react-bootstrap/Card';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Col, Row} from 'react-bootstrap';
import ThumbItem from './thumbItem';
import Loading from "./Loading";
import Message from "./Message";
// import products from '../products';
// istead we are gonna use useEffect and useSate
// import { useEffect, useState, React} from 'react';
// import axios from 'axios';

//instead we will use redux slices
import { useGetProductsQuery } from "../slices/productApiSlice";


function ItemList() {
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
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading? (
         <Loading/>
        ): error? (
          <Message variant="danger"> {error.data?.massage || error.error } </Message>
        ) : (<>
          <Row>
          {products.map((product)=>
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ThumbItem product={product}></ThumbItem>
            </Col>
            )}
            </Row>
        </>)}
          
    </>
  );
}

export default ItemList;