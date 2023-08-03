import React from 'react'
import logo from '../logo_svg.png';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingBag, FaUser } from 'react-icons/fa';
import { Badge, NavDropdown } from 'react-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        console.log("logout");
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top mx-3"></img>
                        <strong>Royal Savarna</strong>
                    </Link>
                        <SearchBox/>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/ctg/men"><h5>Men</h5></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/ctg/women"><h5>Women</h5></Link>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/ctg/kids"><h5>Kids</h5></Link>
                            </li>
                        </ul>
                        
                        <Link className="nav-link" to="/cart">
                            <button type="button" className="btn btn-light ms-2">

                                <FaShoppingBag  />
                                {cartItems.length > 0 && (
                                    <Badge pill bg='light' style={{ marginLeft: "5px", color: "black" }}>
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </Badge>
                                )}
                            </button>
                        </Link>
                        {userInfo ? (
                            <NavDropdown className="btn btn-light ms-2" title={userInfo.name} id='username'>
                                <Link to='/profile'>
                                    <NavDropdown.Item>
                                        <Link className="nav-link" to="/profile">
                                            Profile
                                        </Link>
                                    </NavDropdown.Item>
                                </Link>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                {/* Admin Links */}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown className="btn btn-dark ms-2" title='Admin' id='adminmenu'>

                                <NavDropdown.Item>
                                    <Link to="/admin/productlist">
                                        Product
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/admin/orderlist">
                                        Orders
                                    </Link>
                                </NavDropdown.Item>
                                {/* <Link to='/admin/userlist'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                            </Link> */}
                            </NavDropdown>
                        )}

                            </NavDropdown>
                        ) : (
                            <Link className="nav-link" to="/login"><button type="button" className="btn btn-light ms-2"><FaUser style={{ color: "#a52a2a" }} /> Login</button></Link>
                        )}


                        {/* <form className="d-flex" role="search">
                        <input className="form-control ms-2" variant="warning" type="search" placeholder="Search" aria-label="Search"></input>
                    </form> */}

                        
                    </div>

                </div>
            </nav>
        </div>
    )
}
export default Navbar
