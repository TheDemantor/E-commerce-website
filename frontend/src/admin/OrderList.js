import React from 'react';
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { useGetOrdersQuery } from '../slices/orderApiSlice';


export default function OrderList() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Order List</h2>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DELIVERED</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user && order.user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.totalPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.isPaid ? (
                  <>
                  <FaCheck className="text-green-500" />
                  {order.paidAt.substring(0, 10)}
                  </>
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.isDelivered ? (
                   <>
                   <FaCheck className="text-green-500" />
                  {order.deliveredAt.substring(0, 10)}
                  </>
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/order/${order._id}`}>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Details
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      )}
      </div>
      );
}