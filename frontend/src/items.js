import React from 'react'
import { Container } from 'react-bootstrap'
import ItemList from './components/itemList'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Filters from './components/filters';

export default function items() {
  return (
    <div>
    1. use placeholders
    <Container className='items'>
      <Col className='fliter-section'>
        <h3>Filters</h3>
        <Filters/>
      </Col>
      <Col className='item-section'>
        <Row>
          <p>Total Items</p>
        </Row>
         <ItemList/>
      </Col>
    </Container>

    </div>
  )
}
