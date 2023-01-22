import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderItems = () => {
    const {state} = useLocation()
    return (
        <div>
            <h1>OrderItems</h1>
        </div>
    );
};

export default OrderItems;