import { useContext } from 'react';
import { UserContext } from '@/hooks/UserContextProvider';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Ingredient } from '@/types/interfaces';
import { cn } from '@/lib/utils';

interface Category {
  title: string;
  ingredients: Ingredient[];
}

export const IngredientSelection = () => {
  const { allIngredients, addIngredient, removeIngredientById, ingredients } =
    useContext(UserContext);

  // Handle click on ingredient
  const handleOnClickIngredient = (ingredient: Ingredient) => {
    if (!ingredient) return;

    // If ingredient is already in ingredients, remove it
    if (isInIngredients(ingredient)) {
      removeIngredientById(ingredient.id);
    // If ingredient is not in ingredients, add it
    } else {
      addIngredient(ingredient);
    }
  };

  // Checks if ingredient is already in ingredients
  const isInIngredients = (ingredientToCheck: Ingredient) => {
    return ingredients.some(
      (ingredient) => ingredient.id === ingredientToCheck.id,
    );
  };

  return (
    <div className='w-full justify-center md:flex-[3]'>
      <Card className='h-max bg-white p-4'>
        <CardHeader className='mb-4'>
          <CardTitle className='text-3xl text-secondary'>Ingredients</CardTitle>
          <CardDescription className='text-secondary'>
            Add ingredients for your recipe
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          {allIngredients.map((category: Category) => (
            <div key={category.title} className='bg-gray rounded-lg p-4'>
              <h1 className='mb-2 text-xl font-medium'>{category.title}</h1>
              <div className='flex flex-wrap gap-2'>
                {category.ingredients.map((ingredient: Ingredient) => (
                  <Button
                    size='lg'
                    className={cn(
                      'h-12 rounded-xl bg-primary-600 text-black hover:bg-primary-600/80',
                      isInIngredients(ingredient) &&
                        'bg-primary-900 text-white hover:bg-primary-900/80',
                    )}
                    key={ingredient.id}
                    onClick={() => handleOnClickIngredient(ingredient)}
                    data-test1="ingredient-button"
                  >
                    {ingredient.icon && (
                      <ingredient.icon className='mr-2 h-6 w-6' />
                    )}
                    {ingredient.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
