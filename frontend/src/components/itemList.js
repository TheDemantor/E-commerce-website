// import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import products from '../products';
// istead we are gonna use useEffect and useSate
import ThumbItem from './thumbItem';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';


function ItemList() {
    // let c=1;
  const [products, setProducts]=useState([]);

  useEffect(()=>{
    const fetchProducts = async ()=>{
      const { data } = await axios('/api/products/');
      setProducts(data);
    }

    fetchProducts();
  }, [])

  return (
    <>
    <Row>
      {products.map((product)=>
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <ThumbItem product={product}></ThumbItem>
        </Col>
      )}
    </Row>
    </>
  );
}

export default ItemList;