import React from 'react';
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loading';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../slices/productApiSlice';
import { toast } from 'react-toastify';

export default function ProductList() {
  //For the query
  const { data: products, refetch, isLoading, error } = useGetProductsQuery({});
  //For the mutation 
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
      useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        const res = await deleteProduct(id);
        toast.success(res.message)
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    // console.log("new products");
    try {
      await createProduct();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };



  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Product List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td><Link to={`/SingleItem/${product._id}`}>
                <strong>{product.name}</strong>
            </Link></td>
              <td>₹{product.pricing}</td>
              <td>{product.gender}</td>
              <td>{product.brand}</td>
              <td>
                <Link to={`/admin/product/${product._id}/edit`}>
                  <button className='btn btn-light btn-sm mx-2'>
                    <FaEdit />
                  </button>
                </Link>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => deleteHandler(product._id)}
                >
                  <FaTrash style={{ color: 'white' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}