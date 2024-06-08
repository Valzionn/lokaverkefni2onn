import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchDrinks } from './api';
import { Drink, Dish, Order } from './types';

const DrinkPage = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { dish, order } = location.state as { dish: Dish, order?: Order };

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const drinksData = await fetchDrinks();
        setDrinks(drinksData);
        if (order) {
          setSelectedDrinks(order.drinks);
        }
      } catch (err) {
        console.error('Failed to fetch drinks:', err);
        setError('Failed to fetch drinks');
      } finally {
        setLoading(false);
      }
    };
    getDrinks();
  }, [order]);

  const handleSelectDrink = (drink: Drink) => {
    setSelectedDrinks((prev) => {
      if (prev.includes(drink)) {
        return prev.filter((d) => d.id !== drink.id);
      }
      return [...prev, drink];
    });
  };

  const handleNext = () => {
    navigate('/order', { state: { dish, selectedDrinks, order } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container'>
      <div className='drinks'>
        {drinks.map((drink) => (
          <div key={drink.id} className='drink-item' onClick={() => handleSelectDrink(drink)}>
            <div className='drink-content'>
              <img src={drink.imageSource} alt={drink.name} className='responsive-img' />
              <div className='drink-name'>
                <h2>{drink.name}</h2>
                {selectedDrinks.includes(drink) && <span>Selected</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <button
          className="bg-blue-500 hover:bg-blue-700 shadow-xl outline outline-1 outline-indigo-300 text-xs text-white px-2 py-1 sm:text-sm sm:px-2 sm:py-1 md:text-md md:px-2 md:py-1.5 lg:text-lg lg:px-2 lg:py-2 mt-2 w-24 sm:w-32 md:w-38 lg:w-46"
          onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DrinkPage;