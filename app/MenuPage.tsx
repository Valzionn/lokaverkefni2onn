import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRandomDish } from './api';
import { Dish } from './types';

const MenuPage = () => {
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDish = async () => {
      try {
        const randomDish = await fetchRandomDish();
        setDish(randomDish);
      } catch (err) {
        console.error('Failed to fetch dish:', err);
        setError('Failed to fetch dish');
      } finally {
        setLoading(false);
      }
    };
    getDish();
  }, []);

  const handleNext = () => {
    if (dish) {
      navigate('/drink', { state: { dish } });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Menu</h1>
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
