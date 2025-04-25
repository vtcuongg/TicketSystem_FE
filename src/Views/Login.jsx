import React from 'react';
import '../Styles/Login.scss';
import logo from '../assets/Images/logo.png'

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <div className="logo-text">
                        <span className="Ticket">Ticket</span>
                        <span className="System">System</span>
                    </div>
                </div>
                <h2 className="title">Sign in your account</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" />
                </div>
                <button className="sign-in-button">Sign In</button>
            </div>
        </div>
    );
}

export default Login;