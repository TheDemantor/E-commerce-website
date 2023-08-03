import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loading';
import {
useGetOrderDetailsQuery,
usePayOrderMutation,
useDeliverOrderMutation

} from '../slices/orderApiSlice';


const OrderScreen = () => {
const { id: orderId } = useParams();

const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
// const [payorder, { isLoading: loadingPay }] = usePayOrderMutation();
const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

const { userInfo } = useSelector((state) => state.auth);

// useEffect(() => {
//     if (!errorPayPal && !loadingPayPal && paypal.clientId) {
//       const loadPaypalScript = async () => {
//         paypalDispatch({
//           type: 'resetOptions',
//           value: {
//             'client-id': paypal.clientId,
//             currency: 'USD',
//           },
//         });
//         paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
//       };
//       if (order && !order.isPaid) {
//         if (!window.paypal) {
//           loadPaypalScript();
//         }
//       }
//     }
//   }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);


// console.log(order);

const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
};

return (
isLoading ? <Loader />
: error ? <Message variant="danger">{error.data.message}</Message> : (
<>
<h1>Order {orderId}</h1>
<Row>
    <Col md={8}>
        <ListGroup variant="flush" className="text-left">
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    {/* user's name and email hjas been poulated when get order by id is called */}
                    <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                    <strong>Address:</strong>
                    {order.shippingAdd.address}, {order.shippingAdd.city}{' '}
                    {order.shippingAdd.postalCode},{' '}
                    {order.shippingAdd.country}
                </p>
                {order.isDelivered ? (
                    <Message variant='success'>
                        Delivered on {order.deliveredAt}
                    </Message>
                ) : (
                    <Message variant='danger'>Not Delivered</Message>
                )}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                </p>
                {order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                ) : (
                    <Message variant='danger'>Not Paid</Message>
                )}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItem.length === 0 ? (
                    <Message>Order is empty</Message>
                ) : (
                    <ListGroup variant="flush" className="text-left">
                        {order.orderItem.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </ListGroup.Item>
        </ListGroup>
    </Col>
    <Col md={4}>
        <Card>
            <ListGroup variant="flush" className="text-left">
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items</Col>
                        <Col>₹{order.itemPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>
                {/* PAYMENT BUTTONS */}

                {loadingDeliver && <Loader />}

                {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn btn-block'
                                onClick={deliverHandler}
                            >
                                Mark As Delivered
                            </Button>
                        </ListGroup.Item>
                    )}
            </ListGroup>
        </Card>
    </Col>
</Row>
</>
)
)
}

export default OrderScreen;