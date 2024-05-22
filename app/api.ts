import { Dish, Drink, Order, Provision } from './types';

const apiBaseUrl = 'http://localhost:3001/api';
const ordersApiUrl = `${apiBaseUrl}/orders`;
const createOrderUrl = `${apiBaseUrl}/create-order`;
const updateOrderUrl = `${apiBaseUrl}/update-order`;
const orderByEmailUrl = (email: string) => `${apiBaseUrl}/order/${email}`;
const orderByIdUrl = (id: number) => `${apiBaseUrl}/order/${id}`;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  return response.json();
};

export const fetchOrderByEmail = async (email: string): Promise<Order | null> => {
  const data = await handleResponse<Order | { error: string }>(await fetch(orderByEmailUrl(email)));
  return 'error' in data ? null : data;
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

const fetchFromApi = async <T>(url: string): Promise<T> => {
  try {
    return await handleResponse<T>(await fetch(url));
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
};

export const fetchRandomDish = async (): Promise<Dish | null> => {
  const data = await fetchFromApi<{ meals: any[] }>('https://www.themealdb.com/api/json/v1/1/random.php');
  return data.meals && data.meals.length > 0 ? transformMealToDish(data.meals[0]) : null;
};

export const fetchDrinks = async (): Promise<Drink[]> => {
  const data = await fetchFromApi<{ drinks: any[] }>('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  return data.drinks ? data.drinks.map(transformDrinkToDrink) : [];
};

export const fetchOrders = async (): Promise<Order[]> => {
  return fetchFromApi<Order[]>(ordersApiUrl);
};

export const updateOrder = async (order: Order): Promise<Order> => {
  return handleResponse<Order>(
    await fetch(updateOrderUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
  );
};

export const deleteOrder = async (id: number): Promise<{ success: boolean; deletedorder?: Order }> => {
  return handleResponse<{ success: boolean; deletedorder?: Order }>(
    await fetch(orderByIdUrl(id), { method: 'DELETE' })
  );
};

const transformToProvision = (data: any): Provision => ({
  id: data.idMeal || data.idDrink,
  name: data.strMeal || data.strDrink,
  description: data.strInstructions,
  imageSource: data.strMealThumb || data.strDrinkThumb,
  price: 1500, // Assigning a default price
  category: data.strCategory,
});

const transformMealToDish = (meal: any): Dish => ({
  ...transformToProvision(meal),
  cousine: meal.strArea,
});

const transformDrinkToDrink = (drink: any): Drink => ({
  ...transformToProvision(drink),
  brewer: drink.strAlcoholic,
});