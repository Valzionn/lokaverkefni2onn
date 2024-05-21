import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchDrinks } from './api';
import { Drink, Dish } from './types';

const DrinkPage = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location as { state: { dish: Dish } };

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const drinksData = await fetchDrinks();
        setDrinks(drinksData);
      } catch (err) {
        console.error('Failed to fetch drinks:', err);
        setError('Failed to fetch drinks');
      } finally {
        setLoading(false);
      }
    };
    getDrinks();
  }, []);

  const handleSelectDrink = (drink: Drink) => {
    setSelectedDrinks((prev) => {
      if (prev.includes(drink)) {
        return prev.filter((d) => d.id !== drink.id);
      }
      return [...prev, drink];
    });
  };

  const handleNext = () => {
    navigate('/order', { state: { ...state, selectedDrinks } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Drinks</h1>
      <div>
        {drinks.map((drink) => (
          <div key={drink.id} onClick={() => handleSelectDrink(drink)}>
            <h2>{drink.name}</h2>
            <img src={drink.imageSource} alt={drink.name} />
            {selectedDrinks.includes(drink) && <span>Selected</span>}
          </div>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default DrinkPage;
