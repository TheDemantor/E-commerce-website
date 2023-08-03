import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Row, Col, Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loading';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
// import { URLSearchParams } from 'url';




const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, {isLoading}] =useRegisterMutation();

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
    if(password!==confirmPassword){
      toast.error('Password do not match !')
      return;
    }else{
      try {
        const res = await register({name, email, password}).unwrap();
        dispatch(setCredentials({...res, }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Your full name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your good name.'
            value={name}
            onChange={(e)=>setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId='confirmpassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Re-Enter your password please.'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'  className='my-3' disabled= {isLoading}>
          Register
        </Button>

        { isLoading && <Loader/> }

      </Form>
      <Row className="py-3">
        <Col>
          Already have an account? <Link to={redirect ? '/login?redirect=/shipping' : '/login' }>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Register