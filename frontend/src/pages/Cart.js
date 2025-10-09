import React from 'react';
import { addToCart, deleteFromCart } from '../slices/cartSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const removeFromCartHandler = async (id) => {
    dispatch(deleteFromCart(id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mx-5 my-6 text-left">
      <div className="w-full md:w-2/3">
        <h1 className="mb-8 text-2xl font-bold text-red-700">Your Shopping Bag</h1>
        {cartItems.length === 0 ? (
          <Message>
            Shopping bag is empty ! ! ! <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="py-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <Link to={`/products/${item._id}`} className="font-semibold hover:underline">
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-24 text-center">₹{item.pricing}</div>
                  <div className="w-32">
                    <select
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...(Array(item.in_stock).keys())].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="ml-2 text-red-600 hover:text-red-800 p-2 rounded"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full md:w-1/3">
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-lg font-bold mb-2">
            Subtotal of ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items :
          </h3>
          <div className="text-xl font-semibold mb-4">
            ₹{cartItems.reduce((acc, item) => acc + item.qty * item.pricing, 0).toFixed(2)}
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;