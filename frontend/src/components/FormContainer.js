import {Row, Col, Container} from 'react-bootstrap';

import React from 'react'

const FormContainer = ({children}) => {
  return (
    <Container>
        <Row>
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer