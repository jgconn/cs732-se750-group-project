import { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Box } from "./ui/box";
import { dietReqs } from "@/types/enums";
import { Heart } from "lucide-react";
import { Recipe } from "@/types/interfaces";
import axios from "axios";
import { API_BASE_URL } from "@/types/constants";
import { UserContext } from "@/hooks/UserContextProvider";
import { useToast } from "./ui/use-toast";

interface RecipeDetailsProps {
  recipe: Recipe;
}

export const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const { user } = useContext(UserContext);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { toast } = useToast();

  // On mount check if the recipe is in favourites
  useEffect(() => {
    const fetchIsFavourite = async () => {
      try {
        const dataToSend = { recipeName: recipe.recipeName, recipeSummary: recipe.recipeSummary };
        const response = await axios.post(`${API_BASE_URL}/favourites/${user?._id}`, dataToSend);
        if (response.data && response.status === 200) {
          setIsFavourite(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchIsFavourite();
    }
  }, [recipe, user]);

  // Function to add recipe to favourites or remove a recipe from favourites
  function handleFavClick() {
    // If the recipe is not in favourites, add it
    if (!isFavourite) {
      axios.put(`${API_BASE_URL}/favourites/${user?._id}`, recipe).then((response) => {
        if (response.data && response.status === 201) {
          setIsFavourite(true);
          toast({
            variant: "successful",
            title: "Recipe Added to Favourites",
            description: "Recipe has been added to favourites",
            duration: 3000,
          });
        }
      }).catch(() => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not add recipe to favourites. Please try again.',
          duration: 3000,
        })
      });
    // If the recipe is in favourites, remove it
    } else {
      const dataToSend = { recipeName: recipe.recipeName, recipeSummary: recipe.recipeSummary };
      axios.delete(`${API_BASE_URL}/favourites/${user?._id}`, {data: dataToSend}).then((response) => {
        if (response.data && response.status === 200) {
        setIsFavourite(false);
        toast({
          variant: "successful",
          title: "Recipe successfully removed from favourites",
          description: "Recipe has been removed from favourites",
          duration: 3000,
        });
      }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  return (
    <div className='w-full md:flex-[3] h-full'>
      <Card className='flex flex-col gap-6 h-max bg-white p-4'>
        <CardHeader>
          <CardTitle className='text-3xl text-secondary'>
            Recipe Overview
          </CardTitle>
          <CardDescription className='text-secondary'>
            Generated Recipe
          </CardDescription>
        </CardHeader>
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4 items-center">
            <h1 className="text-4xl font-semibold">
              {recipe.recipeName}
            </h1>
            <Heart onClick={handleFavClick} className="h-8 w-8 hover:cursor-pointer" fill={isFavourite ? "red" : "none"} />
          </div>
          <div className="justify-end">
            {recipe.restrictions.length ? 
            <div className="flex gap-4 justify-start mt-2">
              {recipe.restrictions.map((restriction: string) => (
                <Box className="border-gray-400 border-2" key={restriction}>
                  {dietReqs[restriction as keyof typeof dietReqs]}
                </Box>
              ))}
              </div> 
              : <h1>No Dietary Requirements</h1>
            }
          </div>
        </div>
        <CardContent className="flex gap-2 justify-between">
          <h1>Preparation Time: <span className="font-semibold">{recipe.estimatedPreparationTime}</span></h1>
          <h1>Cooking Time: <span className="font-semibold">{recipe.estimatedCookingTime}</span></h1>
          <h1>Serving Size: {Number(recipe.servingSize) > 1 ? <span className="font-semibold">{recipe.servingSize} servings</span> : <span className="font-semibold">{recipe.servingSize} serving</span>}</h1>
        </CardContent>
        <CardContent className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            Ingredients
          </h1>
          <ul className="flex flex-col gap-2 ml-4">
            {recipe.ingredients.map((ingredient: string) => (
              <div key={ingredient} className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-darkGray/50 mr-2"/>
                <li>{ingredient}</li>
            </div>
          ))}
          </ul>
        </CardContent>
        <CardContent className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            Steps
          </h1>
          <div className="flex flex-col gap-2 ml-4">
            {recipe.instructions.map((instruction: string) => (
              <p key={instruction}>{instruction}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}