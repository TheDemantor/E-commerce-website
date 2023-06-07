
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/navbar';
import Home from './home';
import Login from './login';
import Profile from './profile';
import Items from './items';
import SingleItem from './SingleItem';
import Cart from './cart';
import About from './about';
import Footer from './components/footer';
import Error from './Error';


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
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          <Route path="/items/:id" element={<Items/>}></Route>

          <Route path="/singleItem" element={<SingleItem/>}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<Error mesaage={"There is no page like this"}/>}></Route>
        </Routes>
        <Footer />
        
      </Router>
      
    </div>
  );
}

export default App;

