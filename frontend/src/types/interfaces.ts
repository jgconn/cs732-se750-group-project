import { LucideIcon } from 'lucide-react';

export interface Ingredient {
  id: number;
  name: string;
  food_group: string;
  icon?: LucideIcon;
}

export interface Recipe {
  id: number;
  recipeName: string;
  recipeImage: string;
  ingredients: string[];
  maxCookingTime: string;
  estimatedCookingTime: string;
  estimatedPreparationTime: string;
  servingSize: string;
  restrictions: string[];
  estimatedNutrition: string[];
  recipeSummary: string;
  timeGenerated: Date;
  instructions: string[];
}

export interface WeatherData {
  base: string;
  clouds: object;
  cod: number;
  coord: {lat: number, lon: number};
  currentTime: Date
  dt: Date
  id: number
  main: {feels_like:number, humidity: number, pressure: number, temp: number, temp_max:number, temp_min:number}
  name: string;
  sys: {country:string, id:number, sunrise:Date, sunset:Date, type: number};
  timezone: number
  visibility: number
  weather : {description:string, icon:string, id:number, main:string}[]
  wind: {speed:number, deg:number}
}

export interface SearchCityResult {
  country:string;
  lat:number;
  local_names:object;
  lon:number;
  name:string;
  state:string;
}
