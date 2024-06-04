export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export const API_KEY = 'WEATHER_API_KEY';

export const restrictions = [
  {
    id: 'glutenFree',
    label: 'Gluten Free (GF)',
  },
  {
    id: 'dairyFree',
    label: 'Dairy Free (DF)',
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian',
  },
  {
    id: 'vegan',
    label: 'Vegan',
  },
] as const;
