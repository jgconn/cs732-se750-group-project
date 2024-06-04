import { RecipesDisplay } from '@/components/RecipesDisplay';
import { RecipesWrapper } from '@/components/RecipesWrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { UserContext } from '@/hooks/UserContextProvider';
import { API_BASE_URL } from '@/types/constants';
import { Recipe } from '@/types/interfaces';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResultsPage = () => {
  const navigate = useNavigate();
  const { ingredients, user, recipes, setRecipes, filters } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle more recipes click
  const handleMoreRecipesClick = async () => {
    const dataToSend = { ...filters, ingredients };
    // Set loading state to true while the API call is being made
    setLoading(true);
    axios.post(`${API_BASE_URL}/additionalRecipe`, dataToSend).then((response) => {
      if(response.data && response.status === 200) {
        setRecipes([...recipes, response.data.data]);
      }
    }).catch(() => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch more recipes. Please try again.',
        duration: 3000,
      })
    // Set loading state to false once the API call is complete
    }).finally (() => {
      setLoading(false);
    })
    }

  // Handle recipe click by adding it to history
  const handleRecipeClick = async (recipe: Recipe) => {
    await axios.put(`${API_BASE_URL}/history/${user?._id}`, recipe);
  };

  return (
    <RecipesWrapper>
      <Card className='h-full w-full bg-white p-4'>
        <CardHeader className='mb-4'>
          <CardTitle className='flex items-center justify-between text-3xl text-secondary'>
            Results Overview
            <Button
              className='bg-tertiary px-12 hover:bg-tertiary/90'
              size='lg'
              onClick={() =>
                user
                  ? navigate(`/ingredients/${user._id}`)
                  : navigate('/ingredients')
              }
            >
              Edit Search
            </Button>
          </CardTitle>
          <CardDescription className='text-secondary'>
            Generated recipes
          </CardDescription>
        </CardHeader>
        <RecipesDisplay recipes={recipes} handleRecipeClick={handleRecipeClick} />
        <Button
          className='w-max cursor-pointer flex mt-8 mx-auto bg-tertiary px-12 hover:bg-tertiary/90'
          size='lg'
          onClick={handleMoreRecipesClick}
          disabled={isLoading}
        >
          {isLoading ? <div className='flex'>
          <Loader2 className='h-6 w-6 animate-spin mr-2' />
            Loading more recipes...
          </div>: 'Generate more recipes'}
        </Button>
      </Card>
    </RecipesWrapper>
  );
};
