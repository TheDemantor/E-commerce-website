import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './rating'

const thumbItem = ({product}) => {
  return (
    <div> 
      <Card className='my-3 p-2 rounded'>
        <Link to={`/SingleItem/${product._id}`}>
          <Card.Img src={product.image} variant='top'/>
        </Link>

        <Card.Body>
          
            <Card.Title as="div" className='title'>
          <Link to={`/SingleItem/${product._id}`}>
              <strong>{product.name}</strong>
          </Link>
              
              <h5><strong> ₹{product.pricing} </strong></h5>
            </Card.Title>
            <span>{product.brand}</span>
          {/* <Card.Text > */}
              <Rating rating={product.rating} text={product.reviewCount}/>
          {/* </Card.Text> */}
          
          
        </Card.Body>
      </Card>
    </div>
  )
}

export default  thumbItem