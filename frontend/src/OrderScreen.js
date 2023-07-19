import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form , Button, Card  } from 'react-bootstrap';
import Message from './components/Message';
import Loader from './components/Loading';
import { useGetOrderDetailsQuery } from './slices/orderApiSlice';


const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    console.log("order from order screen");
  return (
     isLoading ? <Loader/> : error ? <Message variant="danger">{error.data?.message || error.error }</Message> : (
        <>
            <h1>Order {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.name}
                                <strong>email: </strong> {order.email}
                                <strong>Address: </strong> {order.shippingAdd}

                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}></Col>
            </Row>
        </>
    )
  )
}

export default OrderScreen;