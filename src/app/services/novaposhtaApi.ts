// Nova Poshta API Integration
const API_KEY = import.meta.env.VITE_NOVA_POSHTA_API_KEY || '';
const API_URL = 'https://api.novaposhta.ua/v2.0/json/';

export interface City {
  Ref: string;
  Description: string;
  DescriptionRu: string;
  Area: string;
}

export interface Warehouse {
  Ref: string;
  Description: string;
  ShortAddress: string;
  Number: string;
}

// Пошук міст
export async function searchCities(searchQuery: string): Promise<City[]> {
  if (!searchQuery || searchQuery.length < 2) {
    return [];
  }
  
  if (!API_KEY) {
      console.warn("Nova Poshta API Key missing in environment variables.");
      return [];
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: 'Address',
        calledMethod: 'getCities',
        methodProperties: {
          FindByString: searchQuery,
          Limit: 20
        }
      })
    });

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

// Отримання відділень за містом
export async function getWarehouses(cityRef: string): Promise<Warehouse[]> {
  if (!cityRef || !API_KEY) {
    return [];
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityRef: cityRef,
          Limit: 50
        }
      })
    });

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    return [];
  }
}

// MOCK DATA для демонстрації (fallback)
export const mockCities: City[] = [
  { Ref: '8d5a980d-391c-11dd-90d9-001a92567626', Description: 'Київ', DescriptionRu: 'Киев', Area: 'Київська область' },
  { Ref: 'db5c88e0-391c-11dd-90d9-001a92567626', Description: 'Львів', DescriptionRu: 'Львов', Area: 'Львівська область' },
  { Ref: 'db5c88f5-391c-11dd-90d9-001a92567626', Description: 'Одеса', DescriptionRu: 'Одесса', Area: 'Одеська область' },
  { Ref: 'db5c88de-391c-11dd-90d9-001a92567626', Description: 'Харків', DescriptionRu: 'Харьков', Area: 'Харківська область' },
  { Ref: 'db5c88d0-391c-11dd-90d9-001a92567626', Description: 'Дніпро', DescriptionRu: 'Днепр', Area: 'Дніпропетровська область' }
];

export const mockWarehouses: Warehouse[] = [
  { Ref: '1', Description: 'Відділення №1: вул. Хрещатик, 1', ShortAddress: 'вул. Хрещатик, 1', Number: '1' },
  { Ref: '2', Description: 'Відділення №2: вул. Шевченка, 25', ShortAddress: 'вул. Шевченка, 25', Number: '2' },
  { Ref: '3', Description: 'Відділення №5: пр. Перемоги, 100', ShortAddress: 'пр. Перемоги, 100', Number: '5' }
];