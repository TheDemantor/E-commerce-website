
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './home';
import Login from './login';
import Profile from './profile';
import Items from './items';
import SingleItem from './singleItem.js';
import Cart from './Cart';
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
        <div style={{    minHeight: "60vh"}}>

        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          <Route path="/items/:id" element={<Items/>}></Route>

          <Route path="/singleItem/:id" element={<SingleItem/>}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<Error mesaage={"There is no page like this"}/>}></Route>
        </Routes>
        </div>
        <Footer />
        
      </Router>
      
    </div>
  );
}

export default App;
