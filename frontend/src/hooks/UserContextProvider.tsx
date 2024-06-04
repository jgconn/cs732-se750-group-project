import React, { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Ingredient, Recipe } from '@/types/interfaces';
import useGet from '@/hooks/useGet';
import { API_BASE_URL } from '@/types/constants';

interface Category {
  title: string;
  ingredients: Ingredient[];
}

interface User {
  _id: string;
  username: string;
  assumedIngredients: string[];
}

interface UserContextProviderType {
  user: User | null;
  ingredients: Ingredient[];
  allIngredients: Category[];
  updateUser: (userData: User) => void;
  setIngredients: (newIngredient: Ingredient[]) => void;
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredientById: (ingredientId: number) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  weatherDetails: string[];
  setWeatherDetails: (data: string[]) => void;
  recipes: Recipe[];
  setRecipes: (newRecipes: Recipe[]) => void;
  currentRecipe: Recipe | null;
  setCurrentRecipe: (recipe: Recipe) => void;
  favourites: Recipe[];
  setFavourites: (newFavourites: Recipe[]) => void;
  history: Recipe[];
  setHistory: (newHistory: Recipe[]) => void;
  filters: any;
  setFilters: (filters: any) => void;
}

export const UserContext = createContext<UserContextProviderType>({
  user: null,
  ingredients: [],
  allIngredients: [],
  updateUser: () => {},
  setIngredients: () => {},
  addIngredient: () => {},
  removeIngredientById: () => {},
  searchText: '',
  setSearchText: () => {},
  weatherDetails: [],
  setWeatherDetails: () => {},
  recipes: [],
  setRecipes: () => {},
  currentRecipe: null,
  setCurrentRecipe: () => {},
  favourites: [],
  setFavourites: () => {},
  history: [],
  setHistory: () => {},
  filters: {},
  setFilters: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [ingredients, setIngredients] = useLocalStorage('ingredients', []);
  const [searchText, setSearchText] = useLocalStorage('searchText', '');
  const [allIngredients, setAllIngredients] = useState<Category[]>([]);
  const [weatherDetails, setWeatherDetails] = useState<string[]>([]);
  const [recipes, setRecipes] = useLocalStorage('recipes', []);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [favourites, setFavourites] = useLocalStorage('favourites', []);
  const [history, setHistory] = useLocalStorage('history', []);
  const [filters, setFilters] = useLocalStorage('filters', null);

  // Fetch main ingredients
  const { data: mainIngredients } = useGet(
    `${API_BASE_URL}/mainIngredients`,
    [],
  );

  useEffect(() => {
    if (mainIngredients) {
      const updatedAllIngredients = [...mainIngredients];

      // Iterate over mainIngredients to check and add new ingredients
      ingredients.forEach((ingredient: Ingredient) => {
        const category = updatedAllIngredients.find(
          (category) => category.title === ingredient.food_group,
        );

        if (!category) {
          // Ingredient's category doesn't exist in allIngredients, add it
          updatedAllIngredients.push({
            title: ingredient.food_group,
            ingredients: [ingredient],
          });
        } else {
          // Ingredient's category exists, check if ingredient already exists
          const existingIngredient = category.ingredients.find(
            (item: Ingredient) => item.id === ingredient.id,
          );
          if (!existingIngredient) {
            // Ingredient doesn't exist in the category, add it
            category.ingredients.push(ingredient);
          }
        }
      });

      setAllIngredients(updatedAllIngredients);
    }
  }, [mainIngredients]);

  const updateUser = (userData: User) => {
    // If there is a user and it is not the same as the user in the context, reset all states
    if(user && userData._id !== user?._id) {
      setIngredients([]);
      setRecipes([]);
      setCurrentRecipe(null);
      setFilters(null);
    }
    setUser(userData);
  };

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients([...ingredients, ingredient]);

    if (
      !allIngredients.some((category: Category) =>
        category.ingredients.some((item) => item.id === ingredient.id),
      )
    ) {
      addIngredientToCategory(ingredient);
    }
  };

  const addIngredientToCategory = (Ingredient: Ingredient) => {
    const categoryName = Ingredient.food_group;
    const existingCategoryIndex = allIngredients.findIndex(
      (category: Category) => category.title === categoryName,
    );
    if (existingCategoryIndex !== -1) {
      // Category exists, add ingredient to it
      const updatedIngredients = [...allIngredients];
      updatedIngredients[existingCategoryIndex].ingredients.push(Ingredient);
      setAllIngredients(updatedIngredients);
    } else {
      // Category doesn't exist, create a new category and add ingredient to it
      const newCategory = {
        title: categoryName,
        ingredients: [Ingredient],
      };
      setAllIngredients((prevIngredients: Category[]) => [
        ...prevIngredients,
        newCategory,
      ]);
    }
  };

  const removeIngredientById = (ingredientId: number) => {
    const updatedIngredients = ingredients.filter(
      (ingredient: Ingredient) => ingredient.id !== ingredientId,
    );
    setIngredients(updatedIngredients);
  };


  return (
    <UserContext.Provider
      value={{
        user,
        ingredients,
        allIngredients,
        updateUser,
        setIngredients,
        addIngredient,
        removeIngredientById,
        searchText,
        setSearchText,
        weatherDetails,
        setWeatherDetails,
        recipes,
        setRecipes,
        currentRecipe,
        setCurrentRecipe,
        favourites,
        setFavourites,
        history,
        setHistory,
        filters,
        setFilters,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
