const ordersApiUrl = 'http://localhost:3001/api/orders';
const createOrderUrl = 'http://localhost:3001/api/create-order';
const updateOrderUrl = 'http://localhost:3001/api/update-order';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  return response.json();
};

export const fetchRandomDish = async () => {
  const response = await fetch('https://themealdb.com/api/json/v1/1/random.php');
  const data = await handleResponse(response);
  return data.meals ? data.meals[0] : null;
};

export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  const data = await handleResponse(response);
  return Array.isArray(data.drinks) ? data.drinks : [];
};

export const fetchOrders = async () => {
  const response = await fetch(ordersApiUrl);
  return handleResponse(response);
};

export const fetchOrderById = async (id: number) => {
  const response = await fetch(`${ordersApiUrl}/${id}`);
  return handleResponse(response);
};

export const createOrder = async (order: any) => {
  const response = await fetch(createOrderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  return handleResponse(response);
};

export const updateOrder = async (id: number, order: any) => {
  const response = await fetch(updateOrderUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  return handleResponse(response);
};

export const deleteOrder = async (id: number) => {
  const response = await fetch(`${ordersApiUrl}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};