import { RecipesDisplay } from "@/components/RecipesDisplay";
import { RecipesWrapper } from "@/components/RecipesWrapper";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/hooks/UserContextProvider";
import { API_BASE_URL } from "@/types/constants";
import axios from "axios";
import { useContext, useEffect } from "react";

export const FavouritesPage = () => {
  const { user, favourites, setFavourites } = useContext(UserContext);
  const { toast } = useToast();

  // On mount fetch favourite recipes
  useEffect(() => {
    axios.get(`${API_BASE_URL}/favourites/${user?._id}`).then((response) => {
      if (response.data && response.status === 200) {
        setFavourites(response.data.favouritedRecipes);
      }
    }).catch(() => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch favourites. Please try again.',
        duration: 3000,
      })
    })
  }, []);

  return (
    <RecipesWrapper>
      <Card className='h-full w-full bg-white p-4'>
        <CardHeader className='mb-4'>
          <CardTitle className='flex items-center justify-between text-3xl text-secondary' >
            Favourite Recipes
          </CardTitle>
          <CardDescription className='text-secondary'>
            Your favourite recipes
          </CardDescription>
        </CardHeader>
        {favourites.length === 0 ? (
          <h1 className='text-center text-3xl font-semibold'>No Favourites Yet!</h1>
        ) : (
          <RecipesDisplay recipes={favourites} />
        )}
      </Card>
    </RecipesWrapper>
  );

};
