import React, { useState } from 'react';
import axios from 'axios';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value}))
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await makeRequest.post('/auth/login', inputs);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem("name", response.data.name)
            navigate('/');
            console.log(response.data);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input type='text' placeholder='Username' name='username' onChange={handleChange}></input>
                    
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type='password' placeholder='Password' name='password' onChange={handleChange}></input>
                </div>
                <div className="form-buttons">
                    <button type="submit" className="login-button">Login</button>
                    <button type="button" className="register-button" onClick={navigateToRegister}>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
