import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './rating'

const thumbItem = ({product}) => {
  return (
    <> 
      <Card className='my-3 p-2 rounded'>
        <Link to={`/SingleItem/${product._id}`}>
          <Card.Img src={product.image} variant='top'/>
        </Link>

        <Card.Body>
          <Link to={`/SingleItem/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text>
              <Rating rating={product.rating} text={product.reviewCount}/>
          </Card.Text>
          <Card.Text>
            <h4>
              <strong>{product.pricing} </strong>
            </h4>
            <p>{product.brand}</p>
          </Card.Text>
          
        </Card.Body>
      </Card>
    </>
  )
}

export default  thumbItem