import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => (
  <div className="categories w-full py-14 flex flex-col items-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 w-full max-w-7xl px-4">
      <Link to="/items/ctg/men" className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col items-center px-1 py-2">
          <img src="images/categories/1.png" alt="Men's Fashion" className="w-full h-full object-cover rounded-xl mb-2" />
        </div>
      </Link>
      <Link to="/items/ctg/women" className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col items-center px-1 py-2">
          <img src="images/categories/2.png" alt="Women's Fashion" className="w-full h-full object-cover rounded-xl mb-2" />
        </div>
      </Link>
      <Link to="/items/ctg/kids" className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col items-center px-1 py-2">
          <img src="images/categories/3.png" alt="Kids' Fashion" className="w-full h-full object-cover rounded-xl mb-2" />
        </div>
      </Link>
      <Link to="/items/ctg/women" className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col items-center px-1 py-2">
          <img src="images/categories/4.png" alt="Women's Fashion Accessories" className="w-full h-full object-cover rounded-xl mb-2" />
        </div>
      </Link>
      <Link to="/items/ctg/men" className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col items-center px-1 py-2">
          <img src="images/categories/5.png" alt="Men's Fashion Accessories" className="w-full h-full object-cover rounded-xl mb-2" />
        </div>
      </Link>
      <Link to="/items" className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col items-center px-1 py-2">
          <img src="images/categories/6.png" alt="Shop All" className="w-full h-full object-cover rounded-xl mb-2" />
        </div>
      </Link>
    </div>
  </div>
);

export default CategoryGrid;
