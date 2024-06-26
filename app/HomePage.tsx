import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrderByEmail } from './api';
import SwiperComponent from './SwiperComponent';

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
        navigate('/receipt', { state: existingOrder });
      } else {
        alert('Could not find order with email: ' + email);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Error fetching order. Please try again.');
    }
  };

  return (
    <div className="container">
      <div><SwiperComponent /></div>
      <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-3xl">Welcome to Large Bites</h1>
      <button className="bg-blue-500 rounded-md hover:bg-blue-700 shadow-xl outline outline-1 outline-indigo-300 text-xs text-white px-2 py-1 sm:text-sm sm:px-2 sm:py-1 md:text-md md:px-2 md:py-1.5 lg:text-lg lg:px-2 lg:py-2 mt-2 w-24 sm:w-32 md:w-38 lg:w-46" onClick={() => navigate('/menu')}>Start Order</button>
      <div className="mt-4 flex items-center">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="text-xs border p-2 sm:text-sm sm:p-2 md:text-md md:p-2 lg:text-lg lg:p-2"
        />
        <button className="bg-green-500 rounded-md hover:bg-green-700 shadow-md shadow-gray-500 outline outline-1 outline-indigo-300 text-xs text-white px-2 py-2 sm:text-sm sm:px-2 sm:py-1.5 md:text-md md:px-2 md:py-2 lg:text-lg lg:px-2 lg:py-2 mt-2 w-24 sm:w-32 md:w-38 lg:w-46 ml-2 mb-2" onClick={handleCheckOrder}>Check Order</button>
      </div>
    </div>
  );
};

export default HomePage;
