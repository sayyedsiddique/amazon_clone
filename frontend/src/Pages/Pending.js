import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Pending = () => {
    const navigate = useNavigate()

    const data = {
        name: "siddique",
        age: "27",
        status: 'online'
      };

    const pendingOrderHandler = () => {
        navigate('/pending?status=pending', {state: data})
    }

    return (
        <div>
            <h1>Pending Order</h1>
            <button onClick={pendingOrderHandler}>Get Pending Order</button>
        </div>
    );
};

export default Pending;