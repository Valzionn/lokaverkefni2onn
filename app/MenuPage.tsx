import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRandomDish } from './api';

const MenuPage = () => {
  const [dish, setDish] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDish = async () => {
      try {
        const randomDish = await fetchRandomDish();
        setDish(randomDish);
      } catch (err) {
        setError('Failed to fetch dish');
      } finally {
        setLoading(false);
      }
    };
    getDish();
  }, []);

  const handleNext = () => {
    navigate('/drink', { state: { dish } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Menu</h1>
      {dish ? (
        <div>
          <h2>{dish.strMeal}</h2>
          <img src={dish.strMealThumb} alt={dish.strMeal} />
          <p>{dish.strInstructions}</p>
        </div>
      ) : (
        <p>No dish available</p>
      )}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default MenuPage;