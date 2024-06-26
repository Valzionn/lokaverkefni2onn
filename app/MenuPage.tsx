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
    <div className='container'>
       <h1 className='flex justify-center font-bold text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-right mb-4'>Today's Special</h1>
      {dish ? (
        <div className='dish-item'>
          <div className='dish-content'>
            <div className='image-container float-left'>
              <img src={dish.imageSource} alt={dish.name} className='responsive-img' />
              <div className='dish-name-container'>
                <h2 className='dish-name'>{dish.name}</h2>
              </div>
            </div>
            <p className='text-xs sm:text-sm md:text-sm lg:text-md xl:text-lg text-right'>{dish.description}</p>
          </div>
          <button className="bg-blue-500 rounded-md hover:bg-blue-700 shadow-xl outline outline-1 outline-indigo-300 text-xs text-white px-2 py-1 sm:text-sm sm:px-2 sm:py-1 md:text-md md:px-2 md:py-1.5 lg:text-lg lg:px-2 lg:py-2 mt-2 w-24 sm:w-32 md:w-38 lg:w-46" onClick={handleNext}>Next</button>
        </div>
      ) : (
        <p>No dish available</p>
      )}
    </div>
  );
};

export default MenuPage;