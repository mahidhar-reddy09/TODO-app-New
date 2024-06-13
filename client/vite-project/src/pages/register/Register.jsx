import React, { useState } from 'react';
import './register.scss';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';

const Register = () => {
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await makeRequest.post('/auth/register', inputs);
            console.log(response.data);
            alert('Successfully registered!');
            navigate('/login');
        } catch (error) {
            console.error('Register error:', error);
        }
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Register</h2>
                <div className="form-group">
                    <label>Name:</label>
                    <input type='text' placeholder='Name' name='name' onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type='text' placeholder='Username' name='username' onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type='password' placeholder='Password' name='password' onChange={handleChange}></input>
                </div>
                <div className="form-buttons">
                    <button type="submit" className="register-button">Register</button>
                    <button type="button" className="login-button" onClick={navigateToLogin}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
