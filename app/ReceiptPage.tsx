import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Order } from './types';

const ReceiptPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return <div>Error: No order data found</div>;
  }

  const order: Order = state;

  const calculatePrice = () => {
    const foodPrice = order.count * order.dish.price;
    const drinksPrice = order.drinks.reduce((total: number, drink: any) => total + drink.price, 0);
    return foodPrice + drinksPrice;
  };

  return (
    <div>
      <h1>Receipt</h1>
      <div>
        <h2>Order Summary</h2>
        <p>Dish: {order.dish.name}</p>
        <p>Drinks: {order.drinks.map((drink: any) => drink.name).join(', ')}</p>
        <p>Number of People: {order.count}</p>
        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
        <p>Email: {order.email}</p>
        <p>Total Price: ${calculatePrice()}</p>
      </div>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default ReceiptPage;
