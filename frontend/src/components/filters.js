import React from 'react';
import { Link } from 'react-router-dom';

const filters = () => {
  return (
    <div className="rounded border border-red-200 bg-red-50 p-4 mb-4">
      <ul className="flex flex-wrap justify-center gap-4">
        <li>
          <Link className="block px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition" to="/items/ctg/men">
            Men
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition" to="/items/ctg/women">
            Women
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 rounded bg-red-400 text-white font-semibold hover:bg-red-500 transition" to="/items/ctg/kids">
            Kids
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default filters;