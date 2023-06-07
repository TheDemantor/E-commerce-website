import React from 'react'
import logo from '../logo.svg';
import {Link} from "react-router-dom";
import { IoBagHandle } from "react-icons/io5";

export default function navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
                <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"></img>
                        Royal Savarna
                </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                            <a class="nav-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                Contact us
                            </a>
                            </li>
                            

                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="nav-link" to="/items/:id">Men</Link></li>
                                    <li><Link className="nav-link" to="/items/:id">Women</Link></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><Link className="nav-link" to="/items/:id">Kids</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        
                        
                        <form className="d-flex" role="search">
                            <input className="form-control ms-2" type="search" placeholder="Search" aria-label="Search"></input>
                        </form>
                            <Link className="nav-link" to="/cart"><IoBagHandle/></Link>
                        <Link className="nav-link" to="/login"><button type="button" className="btn btn-light ms-2"> Login</button></Link>
                    </div>

                </div>
            </nav>
        </div>
    )
}
