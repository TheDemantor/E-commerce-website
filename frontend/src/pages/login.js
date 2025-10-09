import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loading';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
// import { URLSearchParams } from 'url';




export default function Login() {

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
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-10 overflow-hidden min-h-[500px] md:min-h-[600px]">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-red-700">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="mb-3">
              <label htmlFor="email" className="block mb-1 font-semibold text-white">Email</label>
              <input id="email" type="email" className="w-full px-3 py-2 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-1 font-semibold text-white">Password</label>
              <input id="password" type="password" className="w-full px-3 py-2 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50" disabled={isLoading}>Login</button>
          </form>
        </div>
      </div>
      {/* Background Image Section */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/full-length-portrait-smiling-family.jpg')" }}></div>
    </div>
  );
}