import React, { useState } from 'react';
import logo from '../logo_svg.png';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingBag, FaUser } from 'react-icons/fa';
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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <header className="bg-red-700 shadow-lg sticky top-0 z-50">
            <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
                <Link className="flex items-center space-x-3" to="/">
                    <img src={logo} alt="Logo" className="w-10 h-10" />
                    <span className="font-bold text-2xl text-white">Royal Savarna</span>
                </Link>
                <div className="flex-1 mx-6">
                    <SearchBox />
                </div>
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative text-red-200 hover:text-white transition-colors duration-300">
                        <FaShoppingBag size={24} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-semibold text-white rounded-full h-6 w-6 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>
                    {userInfo ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setDropdownOpen((open) => !open)}
                                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                                className="flex items-center space-x-2 text-red-200 hover:text-white transition-colors duration-300 focus:outline-none"
                            >
                                <FaUser size={20} />
                                <span className="font-medium text-sm">{userInfo.name}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-red-800 border border-red-700 rounded-md shadow-lg z-50 pointer-events-auto transition-all duration-200 ease-in-out">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-red-100 hover:bg-red-700 hover:text-white">Profile</Link>
                                    <Link to="/profile?tab=orders" className="block px-4 py-2 text-sm text-red-100 hover:bg-red-700 hover:text-white">My Orders</Link>
                                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-red-100 hover:bg-red-700 hover:text-white">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center space-x-2 text-red-200 hover:text-white transition-colors duration-300">
                            <FaUser size={20} />
                            <span className="font-medium text-sm">Sign In</span>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
