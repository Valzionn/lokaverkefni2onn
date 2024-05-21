import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from './api';
import { Dish, Drink, Order } from './types';

const OrderPage = () => {
  const [date, setDate] = useState('');
  const [count, setCount] = useState(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { dish, selectedDrinks } = location.state as { dish: Dish, selectedDrinks: Drink[] };

  useEffect(() => {
    // Pre-fill date with current date
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(e.target.value, 10));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNext = async () => {
    setError(null);

    if (!dish || !selectedDrinks) {
      setError('Dish and drinks are required.');
      return;
    }

    const order: Omit<Order, 'id'> = {
      email,
      dish,
      count,
      date: new Date(date), // Ensure date is a Date object
      drinks: selectedDrinks,
    };

    try {
      const response = await createOrder(order);
      navigate('/receipt', { state: { ...order, id: response.id } });
    } catch (err) {
      console.error('Error creating order:', err);
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
      <div>
        <h2>Dish</h2>
        <p>{dish.name}</p>
        <p>{dish.description}</p>
      </div>
      <div>
        <h2>Drinks</h2>
        {selectedDrinks.map((drink) => (
          <div key={drink.id}>
            <p>{drink.name}</p>
            <p>{drink.description}</p>
          </div>
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default OrderPage;