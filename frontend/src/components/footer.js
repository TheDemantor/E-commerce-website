import React from 'react'
import {Link} from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

const footer = () => {
return (
  <div>
    <Row className='footer'>
      <Col className="ft-cl">
        <h6>
          Useful links
        </h6>
        <ul className='ft-cl-ul'>
          <li><Link className="ft-cl-it" to="/items">Men</Link></li>
          <li><Link className="ft-cl-it" to="/items">Women</Link></li>
          {/* <li><hr /></li> */}
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
            <li><hr /></li>

          </ul>
          
      </Col>
      <Row>
        <li className="ft-cl-it">Copyright &#169;</li>

      </Row>
    </Row>
  </div>
);
}

export default footer;
