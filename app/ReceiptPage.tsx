import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Order } from './types';
import Image from 'next/image';
import dollar from './dollar.png'

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
    <div className='container max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg flex flex-col items-center'>
      <div className='relative w-full flex items-center justify-center'>
        {/* Background Image */}
        <div 
          className='absolute inset-0 bg-cover bg-center opacity-30 rounded-lg'
          style={{ backgroundImage: `url(${dollar.src})` }} // Adjust if not using Next.js Image
        />
        {/* Overlay to enhance readability */}
        <div className='relative p-8 bg-white bg-opacity-80 rounded-lg'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Order Summary</h2>
          <p className='mb-2'><span className='font-semibold'>Dish:</span> {order.dish?.name || 'N/A'}</p>
          <p className='mb-2'><span className='font-semibold'>Drinks:</span> {order.drinks?.map((drink) => drink.name).join(', ') || 'N/A'}</p>
          <p className='mb-2'><span className='font-semibold'>Number of People:</span> {order.count}</p>
          <p className='mb-2'><span className='font-semibold'>Date:</span> {new Date(order.date).toLocaleDateString()}</p>
          <p className='mb-2'><span className='font-semibold'>Email:</span> {order.email}</p>
          <p className='mb-2'><span className='font-semibold'>Total Price:</span> ${calculatePrice()}</p>
        </div>
      </div>
      <div className='flex mt-6 space-x-4'>
        <button 
          onClick={() => navigate('/')} 
          className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out'
        >
          Back to Home
        </button>
        <button 
          onClick={handleUpdateOrder} 
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out'
        >
          Update Order
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;