
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './home';
import Login from './login';
import Register from './Register';
import Profile from './profile';
import Items from './items';
import SingleItem from './singleItem.js';
import Cart from './Cart';
import About from './about';
import Footer from './components/footer';
import Error from './Error';
import Payment from './Payment';
import Shipping from './Shipping';
import PlaceOrder from './PlaceOrder';
import OrderScreen from './OrderScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PrivateRouter from './components/PrivateRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>

        <Navbar />
        <div style={{    minHeight: "60vh"}}>

        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register/>}></Route>

          <Route path="/items/:id" element={<Items/>}></Route>

          <Route path="/singleItem/:id" element={<SingleItem/>}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<Error mesaage={"There is no page like this"}/>}></Route>

          <Route path="" element={<PrivateRouter />}>
            <Route path="/shipping" element={<Shipping />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/placeorder" element={<PlaceOrder />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>


          </Route>
        </Routes>
        </div>
        <Footer />
        <ToastContainer/>
      </Router>
      
    </div>
  );
}

export default App;

