import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()
    const data = {
        'name': 'siddique'
    }

    const logoutHandler = () => {
        navigate('/logout', {state: data})
    }   
    return (
        <div>
            <h1>Dashboard Page</h1>
            <button type='button' onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default Dashboard;