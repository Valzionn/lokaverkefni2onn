import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder, updateOrder } from './api';
import { Dish, Drink, Order } from './types';

const OrderPage = () => {
  const [date, setDate] = useState('');
  const [count, setCount] = useState(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { dish, selectedDrinks, order } = location.state as { dish: Dish, selectedDrinks: Drink[], order?: Order };

  useEffect(() => {
    if (order) {
      setDate(new Date(order.date).toISOString().slice(0, 10));
      setCount(order.count);
      setEmail(order.email);
    } else {
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [order]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(e.target.value, 10));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    if (!dish || selectedDrinks.length === 0) {
      setError('Dish and drinks are required.');
      return;
    }

    const newOrder: Omit<Order, 'id'> & { name: string } = {
      name: 'temporary name', 
      email,
      dish,
      count,
      date: new Date(date), 
      drinks: selectedDrinks,
    };

    console.log("Order to be sent:", JSON.stringify(newOrder, null, 2)); 

    try {
      const response = order
        ? await updateOrder({ ...order, ...newOrder }) 
        : await createOrder(newOrder); 
      navigate('/receipt', { state: { ...newOrder, id: response.id } });
    } catch (err) {
      console.error('Error submitting order:', err);
      if (err instanceof Error) {
        setError(`Failed to submit the order: ${err.message}`);
      } else {
        setError('Failed to submit the order. Please try again.');
      }
    }
  };

  return (
    <div className='container'>
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
        <h2>Dish -</h2>
        <p>{dish.name}</p>
      </div>
      <div>
        <h2>Drinks -</h2>
        {selectedDrinks.map((drink) => (
          <div key={drink.id}>
            <p>{drink.name}</p>
          </div>
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>{order ? 'Update' : 'Submit'} Order</button>
    </div>
  );
};

export default OrderPage;