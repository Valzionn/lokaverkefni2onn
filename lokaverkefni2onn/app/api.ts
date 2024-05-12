// api.ts
const baseUrl = 'http://localhost:3001/api';

export const getOrders = async () => {
  try {
    const response = await fetch(`${baseUrl}/orders`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${baseUrl}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

export const updateOrder = async (orderData) => {
    try {
      const response = await fetch(`${baseUrl}/update-order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  export const deleteOrderById = async (orderId) => {
    try {
      const response = await fetch(`${baseUrl}/order/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  
  export const deleteOrderByEmail = async (email) => {
    try {
      const response = await fetch(`${baseUrl}/order/${email}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
// Add other API functions here following the same pattern...
