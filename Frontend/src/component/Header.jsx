import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { iconData } from "../assets/assets";
import { AppContext } from '../context/AppContext';

const Header = () => {
    const { parseUser, setToggle, setUser, setToken, credit, logout } = useContext(AppContext);

    const [showLogout, setShowLogout] = useState(false);

    return (
        <div>
            <div className='flex items-center justify-between py-2 px-4 sm:px-8 md:px-10 lg:px-20'>
                <div className="flex items-center">
                    <Link to="/">
                        <img src={iconData.logo} alt="Logo" className='w-24 sm:w-30 lg:w-40' />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {!parseUser ? (
                        <div className='flex space-x-4 items-center'>
                            <Link to="/purchase-credit" className="text-lg sm:text-xl">
                                Pricing
                            </Link>
                            <p className='bg-black text-white px-4 py-2 rounded-xl text-sm sm:text-base cursor-pointer' onClick={() => setToggle(true)}>
                                Login
                            </p>
                        </div>
                    ) : (
                        <div className='flex space-x-4 items-center'>
                            <Link to="/purchase-credit">
                                {<div className='flex items-center gap-2 bg-blue-200 px-4 py-2 rounded-xl text-sm sm:text-base'>
                                    <img src={iconData.credit_star} alt="Credit" className="w-4 sm:w-5" />
                                    Credit left: {credit}
                                </div>}
                            </Link>
                            <div
                                className="flex items-center space-x-4 relative"
                                onMouseEnter={() => setShowLogout(true)}
                                onMouseLeave={() => setShowLogout(false)}
                            >
                                <p className="text-base sm:text-lg">
                                    Hi! {parseUser.name}
                                </p>
                                <p className='cursor-pointer'>
                                    <FaRegUserCircle className='text-xl sm:text-2xl' />
                                </p>
                                {showLogout && (
                                    <div className="z-50 absolute top-6 left-12 transition-all transform duration-200 ease-in-out bg-white shadow-lg rounded-md p-2">
                                        <button className="text-sm sm:text-base"
                                            onClick={logout}>
                                            Logout</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Header;
