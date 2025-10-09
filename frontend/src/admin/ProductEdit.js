import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loading';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductsDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../slices/productApiSlice';


export default function ProductEdit() {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [pricing, setPricing] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [cloth, setCloth] = useState('Fabric');
  const [category, setCategory] = useState('');
  const [in_stock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductsDetailsQuery(productId);
  // console.log(product)

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPricing(product.pricing);
      setImage(product.image);
      setCloth(product.cloth);
      setBrand(product.brand);
      setCategory(product.gender);
      setCountInStock(product.in_stock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        pricing,
        image,
        cloth,
        brand,
        category,
        description,
        in_stock,
      });
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <div className='productSpace'>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error.data.message}</Message>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pricing">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price"
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="form-control"
                />
                {loadingUpload && <Loader />}
              </div>
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cloth">Fabric Used</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter cloth's fabric"
                  value={cloth}
                  onChange={(e) => setCloth(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="in_stock">Count In Stock</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter in stock"
                  value={in_stock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Update
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}