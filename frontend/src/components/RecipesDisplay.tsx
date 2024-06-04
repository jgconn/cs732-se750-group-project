import { useContext } from 'react';
import { UserContext } from '@/hooks/UserContextProvider';
import { Box } from './ui/box';
import { RouteLinks, dietReqs } from '@/types/enums';
import { NutritionalChart } from './NutritionalChart';
import { Recipe } from '@/types/interfaces';
import { useNavigate } from 'react-router-dom';

interface RecipesDisplayProps {
  recipes: Recipe[];
  children?: React.ReactNode | React.ReactNode[];
  handleRecipeClick?: (recipe: Recipe) => void;
}

export const RecipesDisplay = ({ recipes, children, handleRecipeClick }: RecipesDisplayProps) => {
  const { user, setCurrentRecipe } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle recipe click
  const handleClick = (recipe: Recipe) => {
    // If a handleRecipeClick function is provided, call it
    if (handleRecipeClick) {
      handleRecipeClick(recipe);
    }
    setCurrentRecipe(recipe);
    navigate(user ? `${RouteLinks.recipe}/${user._id}` : RouteLinks.recipe);
  };

  return (
    <div className='flex w-full flex-col justify-center gap-6 h-full min-w-[600px]'>
      {recipes?.length && recipes.map((recipe: Recipe) => (
        <div
          key={recipe.recipeSummary}
          className='flex w-full cursor-pointer justify-between gap-6 h-full'
          data-testid="recipe-card"
          onClick={() => handleClick(recipe)}
        >
          <div className='flex gap-4 rounded-l bg-gray px-4 py-6 flex-1'>
            <img
              className='my-auto w-32 h-32 rounded-md drop-shadow-md'
              src={recipe.recipeImage.startsWith('http') ? recipe.recipeImage : `data:image/png;base64,${recipe.recipeImage}`}
              alt='Recipe Image'
              data-testid="recipe-image"
            />
            <div className='flex flex-col gap-4'>
              <h1 className='text-2xl font-semibold' data-testid="recipe-name">{recipe.recipeName}</h1>
              <div className='flex justify-between gap-8'>
                <div className='justify-start'>
                  {recipe.restrictions.length ? (
                    <div className='flex justify-start gap-2'>
                      {recipe.restrictions.map((restriction: string) => (
                        <Box key={restriction}>
                          {dietReqs[restriction as keyof typeof dietReqs]}
                        </Box>
                      ))}
                    </div>
                  ) : (
                    <h1 className='text-lg' data-testid="no-restrictions">No Dietary Requirements</h1>
                  )}
                </div>
                <div className='flex flex-col mr-2'>
                  <h1>
                    Prep Time:{' '}
                    <span className='font-bold' data-testid="recipe-prep-time">
                      {recipe.estimatedPreparationTime}
                    </span>
                  </h1>
                  <h1>
                    Cook Time:{' '}
                    <span className='font-bold' data-testid="recipe-cook-time">
                      {recipe.estimatedCookingTime}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className='flex h-full gap-8 rounded-r bg-gray px-4 py-6 flex-1'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl font-semibold'>Estimated Nutrition</h1>
              <h3 className='text-darkGray mb-8'>
                Summary of total carbohydrates, protein and fat
              </h3>
            </div>
            <div className='flex w-80 h-40'>
            <NutritionalChart recipe={recipe}/>
            </div>
          </div>
        </div>
      ))}
  {children}
    </div>
  );
};
