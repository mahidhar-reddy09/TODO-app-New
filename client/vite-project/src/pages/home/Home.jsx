import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios.js';
import './home.scss';
import Dashboard from '../../components/dash/Dashboard.jsx';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await makeRequest.post('/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem("refreshToken")
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="home-page">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <Dashboard />
        </div>
    );
};

export default HomePage;
