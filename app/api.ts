import { Dish, Drink, Order, Provision } from './types';

const ordersApiUrl = 'http://localhost:3001/api/orders';
const createOrderUrl = 'http://localhost:3001/api/create-order';
const updateOrderUrl = 'http://localhost:3001/api/update-order';
const orderByEmailUrl = (email: string) => `http://localhost:3001/api/order/${email}`;
const orderByIdUrl = (id: number) => `http://localhost:3001/api/order/${id}`;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  return response.json();
};

export const fetchOrderByEmail = async (email: string): Promise<Order | null> => {
  const response = await fetch(orderByEmailUrl(email));
  const data = await handleResponse<Order | { error: string }>(response);
  if ('error' in data) {
    return null;
  }
  return data as Order;
};

export const createOrder = async (order: Omit<Order, 'id'>): Promise<Order> => {
  const response = await fetch(createOrderUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
  });
  return handleResponse<Order>(response);
};

const transformToProvision = (data: any): Provision => {
  const defaultPrice = 1500; // Adjust the default price based on your application's typical range

  return {
    id: data.idMeal || data.idDrink,
    name: data.strMeal || data.strDrink,
    description: data.strInstructions,
    imageSource: data.strMealThumb || data.strDrinkThumb,
    price: parseFloat(data.price) || defaultPrice, // Use parseFloat to ensure a number
    category: data.strCategory,
  };
};

const transformMealToDish = (meal: any): Dish => ({
  ...transformToProvision(meal),
  cousine: meal.strArea,
});

const transformDrinkToDrink = (drink: any): Drink => ({
  ...transformToProvision(drink),
  brewer: drink.strAlcoholic,
});

export const fetchRandomDish = async (): Promise<Dish | null> => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await handleResponse<{ meals: any[] }>(response);
    return data.meals && data.meals.length > 0 ? transformMealToDish(data.meals[0]) : null;
  } catch (error) {
    console.error('Failed to fetch a random dish:', error);
    return null;
  }
};

export const fetchDrinks = async (): Promise<Drink[]> => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    const data = await handleResponse<{ drinks: any[] }>(response);
    return data.drinks ? data.drinks.map(transformDrinkToDrink) : [];
  } catch (error) {
    console.error('Failed to fetch drinks:', error);
    return [];
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(ordersApiUrl);
  return handleResponse<Order[]>(response);
};

export const updateOrder = async (id: number, order: Partial<Omit<Order, 'id'>>): Promise<Order> => {
  const response = await fetch(updateOrderUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...order }),
  });
  return handleResponse<Order>(response);
};

export const deleteOrder = async (id: number): Promise<{ success: boolean; deletedorder?: Order }> => {
  const response = await fetch(orderByIdUrl(id), {
    method: 'DELETE',
  });
  return handleResponse<{ success: boolean; deletedorder?: Order }>(response);
};
