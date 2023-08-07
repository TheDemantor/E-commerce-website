import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Button, Offcanvas, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm } from '@formspree/react';
import MyForm from './Offcanvas';


const Footer = () => {
  const [show, setShow] = useState(false);

  // const [state, handleSubmit] = useForm('contactForm');

  const props = {
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
    placement: 'end',
  }

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);





  return (
    <div>
      <Row className='footer'>
        <Col className="ft-cl">
          <h5>
            Useful links
          </h5>
          <ul className='ft-cl-ul'>
            <li><Link className="ft-cl-it" to="/items/ctg/men">Men</Link></li>
            <li><Link className="ft-cl-it" to="/items/ctg/women">Women</Link></li>
            {/* <li><hr /></li> */}
            <li><Link className="ft-cl-it" to="/items/ctg/kids">Kids</Link></li>

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
              <Button variant="primary" onClick={toggleShow} className="me-2">
                Write to us
              </Button>
              <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Raise your query</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.908299369667!2d78.47756977412315!3d24.866981344998877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979c97c19b9afd7%3A0x4c0ebc43eec4dcf0!2sSavarna%20Fashion%20House!5e0!3m2!1sen!2sin!4v1685263641895!5m2!1sen!2sin"
                    width="300" height="200" style={{border:0}} allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <MyForm/>
                </Offcanvas.Body>
              </Offcanvas>
            </li>
            <li className="ft-cl-it">9131646124</li>
            <li className="ft-cl-it">9532913740</li>

          </ul>

        </Col>
            <hr />
          <span >Copyright &#169; 2023</span>
      </Row>
      

        
    </div>
  );
}

export default Footer;
