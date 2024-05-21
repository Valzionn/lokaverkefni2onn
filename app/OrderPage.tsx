import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder, updateOrder } from './api';

const OrderPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state && state.email) {
      setEmail(state.email);
    }
  }, [state]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(parseInt(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNext = async () => {
    setError(null); // Reset error state
    const order = {
      ...state,
      date,
      time,
      people,
      email,
      dish: state.dish,
      drinks: state.selectedDrinks
    };

    console.log('Order Data:', order); // Log the order data to ensure it's correct
    
    try {
      let response;
      if (state && state.id) {
        response = await updateOrder(state.id, order);
      } else {
        response = await createOrder(order);
      }

      console.log('API Response:', response); // Log the API response

      if (!response || typeof response !== 'object') {
        throw new Error('Invalid API response');
      }

      navigate('/receipt', { state: order });
    } catch (err) {
      console.error('Error creating/updating order:', err);

      // Display the error message to the user
      if (err instanceof Error) {
        setError(`Failed to process the order: ${err.message}`);
      } else {
        setError('Failed to process the order. Please try again.');
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
          Time:
          <input type="time" value={time} onChange={handleTimeChange} min="16:00" max="23:00" />
        </label>
      </div>
      <div>
        <label>
          Number of People:
          <input type="number" value={people} onChange={handlePeopleChange} min="1" max="10" />
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