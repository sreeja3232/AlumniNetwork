

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Adjust this path if needed
import './Navbar.css';
import logo from '../Assets/kmitlogo.jpg'; // This path assumes the structure shown above

const Navbar = ({ onContactClick }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="KMIT logo" />
                <p>KMIT</p>
            </div>
            <ul className="nav-menu">
                <li>
                    <Link to='/' style={{textDecoration: 'none'}}>HOME</Link>
                    {currentPath === '/' && <hr />}
                </li>
                <li>
                    <Link to='/events' style={{textDecoration: 'none'}}>EVENTS</Link>
                    {currentPath === '/events' && <hr />}
                </li>
                <li>
                    <Link to='/careers' style={{textDecoration: 'none'}}>CAREERS</Link>
                    {currentPath === '/careers' && <hr />}
                </li>
                <li onClick={onContactClick} style={{cursor: 'pointer'}}>
                    CONTACT
                    {currentPath === '/contact' && <hr />}
                </li>
            </ul>
            <div className="nav-login">
                {user ? (
                    <>
                        <span>Welcome, {user}</span>
                        <button onClick={() => logout()}>Logout</button>
                    </>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
