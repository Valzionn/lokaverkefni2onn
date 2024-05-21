import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchDrinks } from './api';

const DrinkPage = () => {
    const [drinks, setDrinks] = useState<any[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const drinksData = await fetchDrinks();
        setDrinks(drinksData);
      } catch (err) {
        setError('Failed to fetch drinks');
      } finally {
        setLoading(false);
      }
    };
    getDrinks();
  }, []);

  const handleSelectDrink = (drink: any) => {
    setSelectedDrinks((prev) => {
      if (prev.includes(drink)) {
        return prev.filter((d) => d !== drink);
      }
      return [...prev, drink];
    });
  };

  const handleNext = () => {
    navigate('/order', { state: { ...state, selectedDrinks } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Drinks</h1>
      <div>
        {drinks.map((drink) => (
          <div key={drink.idDrink} onClick={() => handleSelectDrink(drink)}>
            <h2>{drink.strDrink}</h2>
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
            {selectedDrinks.includes(drink) && <span>Selected</span>}
          </div>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default DrinkPage;