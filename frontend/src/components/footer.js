import React from 'react'
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

const footer = () => {
  return (
    <div>
      <Row className='footer'>
        <Col className="ft-cl">
          <h5>
            Useful links
          </h5>
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
          <h5>
            Contact Us
          </h5>
          <ul className='ft-cl-ul'>
            <li>
              <a className="nav-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
              Write to us
            </a>
            </li>
            <li className="ft-cl-it">9131646124</li>
            <li className="ft-cl-it">9532913740</li>
            <li><hr /></li>

          </ul>

        </Col>
        <Row>
          <p>Copyright &#169; 2023</p>

        </Row>
      </Row>
    </div>
  );
}

export default footer;
