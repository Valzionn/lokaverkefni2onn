import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReceiptPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return <div>Error: No order data found</div>;
  }

  const calculatePrice = () => {
    const foodPrice = state.count * state.dish.price;
    const drinksPrice = state.drinks.reduce((total: number, drink: any) => total + drink.price, 0);
    return foodPrice + drinksPrice;
  };

  return (
    <div>
      <h1>Receipt</h1>
      <div>
        <h2>Order Summary</h2>
        <p>Dish: {state.dish.name}</p>
        <p>Drinks: {state.drinks.map((drink: any) => drink.name).join(', ')}</p>
        <p>Number of People: {state.count}</p>
        <p>Date: {new Date(state.date).toLocaleDateString()}</p>
        <p>Email: {state.email}</p>
        <p>Total Price: ${calculatePrice()}</p>
      </div>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default ReceiptPage;