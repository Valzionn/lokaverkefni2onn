'use client'
import React, { useEffect, useState } from 'react';
import * as api from './api';

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState('');
  const [dishId, setDishId] = useState('');
  const [drinkId, setDrinkId] = useState('');
  const [count, setCount] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await api.getOrders();
      if (ordersData) {
        setOrders(ordersData)
      }
    };

    fetchOrders();
  }, []);

  const resetForm = () => {
    setEmail('');
    setDishId('');
    setDrinkId('');
    setCount(1);
  };

  const handleCreateOrder = async () => {
    const newOrderData = {
      email,
      dish: {
        id: dishId,
        category: dishId,
        description: dishId,
        imageSource: dishId,
        name: dishId,
        price: dishId,
      },
      drinks: [
        {
          id: drinkId,
          category: drinkId,
          cousine: drinkId,
          description: drinkId,
          imageSource: drinkId,
          name: drinkId,
          price: drinkId,
        },
      ],
      count,
      date: new Date(),
    };
    try {
      const result = await api.createOrder(newOrderData);
      if (result.success) {
        console.log('Order created:', result.order);
        setOrders([...orders, result.order]);
        resetForm();
      } else {
        setError('Error creating order: ' + result.error);
      }
    } catch (err) {
      setError('Failed to create order.');
    }
  };

  // Handler for updating an order
  const handleUpdateOrder = async (orderId) => {
    const updatedOrderData = {
      // ... updated order data ...
    };
    const result = await api.updateOrder(updatedOrderData);
    if (result.success) {
      // Handle successful update
      console.log('Order updated:', result.order);
    } else {
      // Handle error
      console.error('Error updating order:', result.error);
    }
  };

  // Handler for deleting an order by ID
  const handleDeleteOrderById = async (orderId) => {
    const result = await api.deleteOrderById(orderId);
    if (result.success) {
      // Handle successful deletion
      console.log('Order deleted:', result.deletedorder);
    } else {
      // Handle error
      console.error('Error deleting order:', result.error);
    }
  };

  // Handler for deleting an order by email
  const handleDeleteOrderByEmail = async (email) => {
    const result = await api.deleteOrderByEmail(email);
    if (result.success) {
      // Handle successful deletion
      console.log('Order deleted:', result.deletedorder);
    } else {
      // Handle error
      console.error('Error deleting order:', result.error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='text-black'
      />
      <input
        type="text"
        placeholder="Enter dish ID"
        value={dishId}
        onChange={(e) => setDishId(e.target.value)}
        className='text-black'
      />
      <input
        type="text"
        placeholder="Enter drink ID"
        value={drinkId}
        onChange={(e) => setDrinkId(e.target.value)}
        className='text-black'
      />
      <input
        type="number"
        placeholder="Enter quantity"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value, 10))}
        className='text-black'
      />
      <button onClick={handleCreateOrder}>Place Order</button>

      {error && <p className="error">{error}</p>}

      {/* Render existing orders */}
      <h3>Current Orders:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Email: <strong>{order.email}</strong></p>
            <p>Dish: <strong>{order.dish.name}</strong> - {order.dish.description}</p>
            <p>Drinks:</p>
            <ul>
              {order.drinks.map((drink) => (
                <li key={drink.id}><strong>{drink.name}</strong> - {drink.description}</li>
              ))}
            </ul>
            <p>Quantity: <strong>{order.count}</strong></p>
            <p>Date: <strong>{formatDate(order.date)}</strong></p>
            <button onClick={() => handleUpdateOrder(order.id)}>Update Order</button>
            <button onClick={() => handleDeleteOrderById(order.id)}>Delete Order</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Page;