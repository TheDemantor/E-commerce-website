import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const filters = () => {
  return (
    <Container className="filter-section">
        <Col>
          <Row>  
          <ul className="m-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/ctg/men"><h5>Men</h5></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/ctg/women"><h5>Women</h5></Link>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/ctg/kids"><h5>Kids</h5></Link>
                            </li>
                        </ul>
          </Row>
          <Row>         </Row>
          <Row>        </Row>
        </Col>
        <br />
        <Col>
          <Row>         </Row>
          <Row>         </Row>
          <Row>         </Row>
        </Col>
    </Container>
  )
}

export default filters