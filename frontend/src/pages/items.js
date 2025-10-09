import React from 'react'
import Filters from '../components/filters';
import { useParams } from 'react-router-dom';
import ThumbItem from '../components/thumbItem';
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productApiSlice";

export default function Items() {
  const { keyword = '', ctg = '' } = useParams(); 
  const { data: products, isLoading, error } = useGetProductsQuery({keyword, ctg});
  return (
    <div className="flex flex-col md:flex-row gap-8 mx-5 my-6 text-left">
      <div className="md:w-1/4 w-full mb-8 md:mb-0">
        <h3 className="text-xl font-bold mb-4">Filters</h3>
        <Filters />
      </div>
      <div className="flex-1">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-lg font-semibold mb-2 md:mb-0">Total Items</p>
          <span className="text-gray-600">Sort</span>
        </div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger"> {error?.data?.massage || error.error}</Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) =>
              <ThumbItem key={product._id} product={product} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
