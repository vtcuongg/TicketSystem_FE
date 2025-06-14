import React, { useState, useEffect } from 'react';
import '../Styles/Login.scss';
import logo from '../assets/Images/logo.png'
import { useSignInMutation } from '../Services/userApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Stores/authSlice';
import { jwtDecode } from 'jwt-decode';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";
const Login = ({ setConnection }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signIn, { isLoading, error }] = useSignInMutation();
    const checkTokenExpiry = () => {
        const token = localStorage.getItem('authToken');
        if (!token) return false;

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            return true;
        }
    };
    const validateInputs = () => {
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError("Email is required");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("	Invalid email address");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            valid = false;
        }

        return valid;
    };
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    useEffect(() => {
        if (checkTokenExpiry()) {
            handleLogout();
        }
    }, []);
    const handleSignIn = async () => {
        if (!validateInputs()) return;
        try {
            const result = await signIn({ email, password }).unwrap();
            localStorage.setItem('authToken', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));

            dispatch(setUser(result.user));
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl("https://vietcuong-001-site1.jtempurl.com/chathub", {
                    accessTokenFactory: () => result.token,
                })
                .withAutomaticReconnect()
                .build();
            newConnection.on("UserOnline", (user) => {
            });

            newConnection.on("UserOffline", (user) => {
            });
            await newConnection.start();
            setConnection(newConnection);
            navigate('/create-ticket');
        } catch (err) {
        }
    };
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
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Enter Password" />
                </div>
                <button className="sign-in-button" onClick={handleSignIn} disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
                {(emailError || passwordError || error) && (
                    <p style={{ color: 'red' }}>
                        {emailError ||
                            passwordError ||
                            error?.data?.message ||
                            "Login failed"}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;