import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder, updateOrder } from './api';
import { Dish, Drink, Order } from './types';
import dollar from './dollar.png'

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
      <div className='flex justify-center items-center w-full'>
        <div className='relative p-8 w-full max-w-lg'>
          <div 
            className='absolute inset-0 bg-cover bg-center opacity-30 rounded-lg'
            style={{ backgroundImage: `url(${dollar.src})` }}
          />
          <div className='relative z-10'>
            <h1 className='text-2xl font-bold mb-4 text-center text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Your Order</h1>
            <div className='mb-4'>
              <label className='block'>
                Date:
                <input type="date" value={date} onChange={handleDateChange} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block'>
                Number of People:
                <input type="number" value={count} onChange={handleCountChange} min="1" max="10" className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block'>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
              </label>
            </div>
            <div className='mb-4'>
              <h2 className='font-semibold'>Dish:</h2>
              <p>{dish.name || 'N/A'}</p>
            </div>
            <div className='mb-4'>
              <h2 className='font-semibold'>Drinks:</h2>
              {selectedDrinks.length > 0 ? selectedDrinks.map((drink) => (
                <div key={drink.id}>
                  <p>{drink.name}</p>
                </div>
              )) : <p>N/A</p>}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='flex justify-center mt-4'>
              <button 
                className="bg-blue-500 rounded-md hover:bg-blue-700 shadow-xl outline outline-1 outline-indigo-300 text-white px-4 py-2 transition duration-300 ease-in-out"
                onClick={handleSubmit}
              >
                {order ? 'Update' : 'Submit'} Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;