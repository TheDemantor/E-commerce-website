// import products from './products'
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/rating'
// import axios from 'axios';
import { useGetProductsDetailsQuery, useCreateReviewMutation } from "../slices/productApiSlice";
import { addToCart } from '../slices/cartSlice';
import Message from "../components/Message";
import Loading from "../components/Loading";
import { toast } from 'react-toastify';


const SingleItem = () => {
  // const item = products.find((p) => p._id === itemId);

  const { id: itemId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //USING CONTEXT API
  // const [item, setItem] =useState({});

  // useEffect(()=>{
  //   const fetchItem = async ()=>{
  //       const { data } = await axios.get(`/api/products/${itemId}`);
  //       setItem(data);
  //   };
  //   fetchItem();
  // },[itemId]);

  //USING REDUX 

  const addToCartHandler = () => {
    dispatch(addToCart({ ...item, qty }));
    navigate('/cart')
  }
  const { data: item, refetch, isLoading, error } = useGetProductsDetailsQuery(itemId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        itemId,
        rating,
        comment,
        user: userInfo
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      console.log(err.error)
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Link to='/items/' className='inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded my-3'>
        Go back
      </Link>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"> {error.data?.massage || error.status} </Message>
      ) : (
        <>
          <div className='flex flex-col md:flex-row gap-8 productSpace'>
            <div className='md:w-1/3 w-full'>
              <img src={item.image} alt={item.name} className='w-full rounded' />
            </div>
            <div className='md:w-2/3 w-full'>
              <div className='space-y-4 text-left'>
                <h2 className='text-2xl font-bold'>{item.name}</h2>
                <h6 className='text-lg text-gray-600'>{item.brand}</h6>
                <div><strong>Price: ₹{item.pricing}</strong></div>
                <div>Fabric: {item.cloth}</div>
                <div>{item.description}</div>
                <Rating rating={item.rating} text={item.reviewCount} />
                <div className='flex gap-4 mt-4'>
                  <button className="bg-yellow-400 text-white px-4 py-2 rounded disabled:opacity-50" disabled={item.in_stock === 0} onClick={() => addToCartHandler()}>Add to cart</button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50" disabled={item.in_stock === 0} onClick={checkoutHandler}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={submitHandler} className='text-left p-4 bg-gray-50 rounded mt-8'>
            <h2>Write a Customer Review</h2>

            {loadingProductReview && <Loading />}

            {userInfo ? (
              <div className='space-y-4'>
                <div className='my-2'>
                  <label htmlFor='rating' className='block mb-1'>Rating</label>
                  <select
                    id='rating'
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className='block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </select>
                </div>
                <div className='my-2'>
                  <label htmlFor='comment' className='block mb-1'>Comment</label>
                  <textarea
                    id='comment'
                    rows='3'
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  ></textarea>
                </div>
                <button
                  disabled={loadingProductReview}
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50'
                >
                  Submit
                </button>
              </div>
            ) : (
              <Message>
                Please <Link to='/login' className='underline'>sign in</Link> to write a review
              </Message>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default SingleItem;