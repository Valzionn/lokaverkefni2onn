import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReceiptPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const calculatePrice = () => {
    const foodPrice = state.people * 10;
    const drinksPrice = state.selectedDrinks.length * 5;
    return foodPrice + drinksPrice;
  };

  return (
    <div>
      <h1>Receipt</h1>
      <div>
        <h2>Order Summary</h2>
        <p>Dish: {state.dish.strMeal}</p>
        <p>Drinks: {state.selectedDrinks.map((drink: any) => drink.strDrink).join(', ')}</p>
        <p>Number of People: {state.people}</p>
        <p>Date: {state.date}</p>
        <p>Time: {state.time}</p>
        <p>Email: {state.email}</p>
        <p>Total Price: ${calculatePrice()}</p>
      </div>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default ReceiptPage;