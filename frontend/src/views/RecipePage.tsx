import { RecipeDetails } from "@/components/RecipeDetails";
import { DetailedNutrition } from "@/components/DetailedNutition";
import { useContext } from "react";
import { UserContext } from "@/hooks/UserContextProvider";

const RecipePage = () => {
  const { currentRecipe } = useContext(UserContext);

  return (
    <div className='flex h-full w-full flex-col items-center flex-1 bg-primary-500'>
      <div className='flex w-8/12 h-full flex-col gap-4 bg-primary-500 py-8 md:flex-row'>
        <RecipeDetails recipe={currentRecipe!} />
        <div className='flex flex-[1] flex-col gap-4'>
          <DetailedNutrition recipe={currentRecipe!} />
        </div>
      </div>
    </div>

  )
};export default RecipePage;

