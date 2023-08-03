import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loading';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductsDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../slices/productApiSlice';


const ProductEdit = () => {
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
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3 gb-btn'>
        Go Back
      </Link>
      <FormContainer style={{ width: '50%' }}>

        <div className='productSpace'>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error.data.message}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='pricing'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  label='Choose File'
                  onChange={uploadFileHandler}
                  type='file'
                ></Form.Control>
                {loadingUpload && <Loader />}
              </Form.Group>

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='cloth'>
                <Form.Label>Fabric Used</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter cloth's fabric"
                  value={cloth}
                  onChange={(e) => setCloth(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='in_stock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter in stock'
                  value={in_stock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                type='submit'
                variant='primary'
                style={{ marginTop: '1rem' }}
              >
                Update
              </Button>
            </Form>
          )}
        </div>
      </FormContainer>

    </>
  )
}

export default ProductEdit