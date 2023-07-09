import React from 'react'
import logo from '../logo_svg.png';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaShoppingBag } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <div>
            <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top mx-3"></img>
                        <strong>Royal Savarna</strong>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/:id"><h5>Men</h5></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/:id"><h5>Women</h5></Link>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/items/:id"><h5>Kids</h5></Link>
                            </li>
                        </ul>


                        <Link className="nav-link" to="/cart">
                            <FaShoppingBag style={{ color: "#ffba24", height: "1.5rem" }} />
                            { cartItems.length() > 0 && (
                                <Badge pill bg='light' style={{marginLeft: "5px"}}>
                                    {cartItems.reduce((a, c)=> a+c.qty, 0)}
                                </Badge>
                             )}
                        </Link>
                        <Link className="nav-link" to="/login"><button type="button" className="btn btn-light ms-2"> Login</button></Link>
                        <form className="d-flex" role="search">
                            <input className="form-control ms-2" variant="warning" type="search" placeholder="Search" aria-label="Search"></input>
                        </form>
                    </div>

                </div>
            </nav>
        </div>
    )
}
export default Navbar