
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Items from './pages/items';
import SingleItem from './pages/singleItem.js';
import Cart from './pages/Cart';
import Footer from './components/footer';
import Error from './pages/Error';
import Payment from './pages/Payment';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import OrderScreen from './pages/OrderScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PrivateRouter from './components/PrivateRouter';
import AdminRouter from './components/AdminRouter';
import OrderList from './admin/OrderList';
import ProductList from './admin/ProductList';
import ProductEdit from './admin/ProductEdit';
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
        <div style={{ minHeight: "60vh" }}>

          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route path="/items" element={<Items />}></Route>
            <Route path="/items/:keyword" element={<Items />}></Route>
            <Route path="/items/:keyword/:ctg" element={<Items />}></Route>

            <Route path="/singleItem/:id" element={<SingleItem />}></Route>
            <Route path="/cart" element={<Cart />}></Route>

            <Route path="*" element={<Error mesaage={"There is no page like this"} />}></Route>

            <Route path="" element={<PrivateRouter />}>
              <Route path="/shipping" element={<Shipping />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/payment" element={<Payment />}></Route>
              <Route path="/placeorder" element={<PlaceOrder />}></Route>
              <Route path="/order/:id" element={<OrderScreen />}></Route>
            </Route>
            <Route path="" element={<AdminRouter />}>
              <Route path='/admin/orderlist' element={<OrderList />} />
              <Route path='/admin/productlist' element={<ProductList />} />
              <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
              {/* <Route path='/admin/productlist/:pageNumber' */}
                {/* element={<ProductListScreen />} /> */}
              {/* <Route path='/admin/userlist' element={<UserListScreen />} /> */}
              {/* <Route path='/admin/user/:id/edit' element={<UserEditScreen />} /> */}
            </Route>

          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </Router>

    </div>
  );
}

export default App;

