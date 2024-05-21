import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from './api';

const HomePage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    const handleStartOrder = async () => {
      const orders = await fetchOrders();
      const existingOrder = orders.find((order: any) => order.email === email);
      
      if (existingOrder) {
        navigate('/menu', { state: existingOrder });
      } else {
        navigate('/menu');
      }
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Our Restaurant</h1>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={() => navigate('/menu')}>Start Order</button>
        <div className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="border p-2"
          />
          <button className="bg-green-500 text-white px-4 py-2 ml-2" onClick={handleStartOrder}>Check Order</button>
        </div>
      </div>
    );
  };
  
  export default HomePage;