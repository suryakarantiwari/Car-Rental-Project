import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../index.css";

const Layout = (props) => {

    const navigate = useNavigate();

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        toast.success('You have successfully logged out!');
        navigate('/login');
    }

    const profilePage = () =>{
        navigate('/profile')
    }
  return (
    <>
        {/* <div className='header'>
            <div className='col'>
                <a href="/" className='logo'>Car Rental</a>
            </div>
            <div className="col">
                <span onClick={profilePage} className='name userName'>{userInfo?.username}</span>
                {userInfo ? (
                    <span onClick={logoutHandler} className='logout'>Logout</span>
                ) : (
                    <a href="/login" className='login'>Login</a>
                )}
                
            </div>
        </div> */}


        <div className='navbar'>
            <div className='car-rental-logo'>
                <a href='/' className='car-logo'>Car Rental</a>
            </div>
            <div className='nav-items'>
                <span onClick={profilePage} className='nav-username'>{userInfo?.username}</span>
                {/* <span className='nav-login'>Login</span> */}
                {userInfo ? (
                    <span onClick={logoutHandler} className='nav-logout'>Logout</span>
                ) : (
                    <a href="/register" className='nav-login'>Register</a>
                )}
            </div>
        </div>

        <div className='main'>
            {props.children}
        </div>
        
        {/* <div className='footer'>
            <p>&copy;2022. All rights reserved. Powered by Miljan Peric.</p>
        </div> */}
    </>
  )
}

export default Layout