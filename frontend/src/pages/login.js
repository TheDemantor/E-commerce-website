import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Row, Col, Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loading';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
// import { URLSearchParams } from 'url';




const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] =useLoginMutation();

  const {userInfo} = useSelector((state)=> state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(()=>{
    if(userInfo!=null){
      navigate(redirect);
    }
    
  }, [userInfo, redirect, navigate]);
  
  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res, }));
      navigate(redirect);
      // document.cookie = 'dark_mode=true'
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Id</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email address.'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password please.'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'  className='my-3' disabled= {isLoading}>
          Sign In
        </Button>

        { isLoading && <Loader/> }

      </Form>
      <Row className="py-3">
        <Col>
          New Costomer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register' }>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Login