import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrderByEmail } from './api';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCheckOrder = async () => {
    try {
      const existingOrder = await fetchOrderByEmail(email);
      if (existingOrder) {
        navigate('/menu', { state: existingOrder });
      } else {
        alert('Could not find order with email: ' + email);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Error fetching order. Please try again.');
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
        <button className="bg-green-500 text-white px-4 py-2 ml-2" onClick={handleCheckOrder}>Check Order</button>
      </div>
    </div>
  );
};

export default HomePage;