import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './rating';

const thumbItem = ({ product }) => {
  return (
    <div className="my-3 p-2 rounded shadow bg-white">
      <Link to={`/SingleItem/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover rounded"
        />
      </Link>
      <div className="py-2 px-1">
        <div className="flex justify-between items-center mb-1">
          <Link to={`/SingleItem/${product._id}`} className="text-lg font-semibold hover:underline">
            {product.name}
          </Link>
          <h5 className="text-xl font-bold text-green-700">₹{product.pricing}</h5>
        </div>
        <span className="block text-sm text-gray-500 mb-1">{product.brand}</span>
        <Rating rating={product.rating} text={product.reviewCount} />
      </div>
    </div>
  );
};

export default thumbItem;