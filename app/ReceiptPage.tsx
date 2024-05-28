import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Order } from './types';

const ReceiptPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state as Order;

  console.log('Received order in ReceiptPage:', order);

  if (!order) {
    return <div>Error: No order data found</div>;
  }

  const calculatePrice = () => {
    if (!order.dish) {
      console.error('Dish is undefined:', order);
      return 0;
    }
    const foodPrice = order.count * order.dish.price;
    const drinksPrice = order.drinks.reduce((total: number, drink: any) => total + drink.price, 0);
    return foodPrice + drinksPrice;
  };

  const handleUpdateOrder = () => {
    navigate('/menu', { state: { order } });
  };

  return (
    <div className='container'>
      <div>
        <h2>Order Summary</h2>
        <p>Dish: {order.dish?.name || 'N/A'}</p>
        <p>Drinks: {order.drinks?.map((drink: any) => drink.name).join(', ') || 'N/A'}</p>
        <p>Number of People: {order.count}</p>
        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
        <p>Email: {order.email}</p>
        <p>Total Price: ${calculatePrice()}</p>
      </div>
      <button onClick={() => navigate('/')}>Back to Home</button>
      <button onClick={handleUpdateOrder}>Update Order</button>
    </div>
  );
};

export default ReceiptPage;