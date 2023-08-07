import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { useGetOrdersQuery } from '../slices/orderApiSlice';


const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>₹{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  <>
                  <FaCheck style={{ color: 'green' }} />
                  {order.paidAt.substring(0, 10)}
                  </>
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                   <>
                   <FaCheck style={{ color: 'green' }} />
                  {order.deliveredAt.substring(0, 10)}
                  </>
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <Link to={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>
                    Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      )}
      </>
      );
};

export default OrderList