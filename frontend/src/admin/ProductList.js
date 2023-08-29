import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loading';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../slices/productApiSlice';
import { toast } from 'react-toastify';

const ProductList = () => {
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
<>
  <Row className='align-items-center'>
    <Col>
      <h1>Products</h1>
    </Col>
    <Col className='text-end'>
      <Button className='my-3' onClick={createProductHandler}>
        <FaPlus /> Create Product
      </Button>
    </Col>
  </Row>
  
  {loadingDelete && <Loader />}
  {loadingCreate && <Loader />}
  {/* {loadingDelete && <Loader />} */}
  {isLoading ? (
  <Loader />
  ) : error ? (
  <Message variant='danger'>{error.data?.message||error.error}</Message>
  ) : (
  <>
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>PRICE</th>
          <th>CATEGORY</th>
          <th>BRAND</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
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
                <Button variant='light' className='btn-sm mx-2'>
                  <FaEdit />
                </Button>
              </Link>
              <Button
                variant='danger'
                className='btn-sm'
                onClick={() => deleteHandler(product._id)}
              >
                <FaTrash style={{ color: 'white' }} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
  )}
</>
);
};

export default ProductList