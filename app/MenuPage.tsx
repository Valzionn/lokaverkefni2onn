import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchRandomDish } from './api';
import { Dish, Order } from './types';

const MenuPage = () => {
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const existingOrder = location.state?.order as Order | undefined;

  useEffect(() => {
    const getDish = async () => {
      try {
        if (existingOrder) {
          setDish(existingOrder.dish);
        } else {
          const randomDish = await fetchRandomDish();
          setDish(randomDish);
        }
      } catch (err) {
        console.error('Failed to fetch dish:', err);
        setError('Failed to fetch dish');
      } finally {
        setLoading(false);
      }
    };
    getDish();
  }, [existingOrder]);

  const handleNext = () => {
    if (dish) {
      navigate('/drink', { state: { dish, order: existingOrder } });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {dish ? (
        <div>
          <h2>{dish.name}</h2>
          <img src={dish.imageSource} alt={dish.name} />
          <p>{dish.description}</p>
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <p>No dish available</p>
      )}
    </div>
  );
};

export default MenuPage;