import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from './api';
import { Order, Dish, Drink } from './types';

const OrderPage = () => {
  const [date, setDate] = useState('');
  const [count, setCount] = useState(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location as { state: Partial<Order> & { dish: Dish, selectedDrinks: Drink[] } };

  useEffect(() => {
    if (state && state.email) {
      setEmail(state.email);
    }
  }, [state]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNext = async () => {
    setError(null); // Reset error state
    const order: Omit<Order, 'id'> = {
      date: new Date(date), // Ensure this is a Date object
      count,
      email,
      dish: state.dish,
      drinks: state.selectedDrinks || [] // Ensure drinks is always an array
    };

    console.log('Order Data:', JSON.stringify(order, null, 2)); // Log the order data to ensure it's correct

    try {
      const response = await createOrder(order);
      console.log('API Response:', JSON.stringify(response, null, 2)); // Log the API response
      navigate('/receipt', { state: { ...order, id: response.id } }); // Ensure the id is passed to the next page
    } catch (err) {
      console.error('Error creating order:', err);
      // Display the error message to the user
      if (err instanceof Error) {
        setError(`Failed to create the order: ${err.message}`);
      } else {
        setError('Failed to create the order. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Order</h1>
      <div>
        <label>
          Date:
          <input type="date" value={date} onChange={handleDateChange} />
        </label>
      </div>
      <div>
        <label>
          Number of People:
          <input type="number" value={count} onChange={handleCountChange} min="1" max="10" />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default OrderPage;