import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/items/${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-48 md:w-64"
      />
      {/*
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
        <FaSearch />
      </button>
      */}
    </form>
  );
};

export default SearchBox;
