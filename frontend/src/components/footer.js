import React from 'react'
import {Link} from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

export default function footer() {
return (
  <Row className='footer'>
    <Col className="ft-cl">
      <h6>
        Useful links
      </h6>
      <ul className='ft-cl-ul'>
        <li><Link className="ft-cl-it" to="/items">Men</Link></li>
        <li><Link className="ft-cl-it" to="/items">Women</Link></li>
        <li><hr className="dropdown-divider"></hr></li>
        <li><Link className="ft-cl-it" to="/items">Kids</Link></li>

      </ul>
    </Col>
    <Col>
        <div className="lg-text text-uppercase">
          savarna
        </div>
    </Col>
    <Col className="ft-cl">
      <h6>
        Contact Us
      </h6>
        <ul className='ft-cl-ul'>
          <li className="ft-cl-it">9131646124</li>
          <li className="ft-cl-it">9532913740</li>
          <li><hr className="dropdown-divider"></hr></li>
        </ul>
        
    </Col>
  </Row>
)
}
