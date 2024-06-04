import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { NutritionalChart } from "./NutritionalChart";
import { Recipe } from "@/types/interfaces";

interface DetailedNutitionProps {
    recipe: Recipe
}

export const DetailedNutrition = ({ recipe }: DetailedNutitionProps) => {

    // Splits the nutrient into name and value
    function splitNutrient(item: string) {
    const items = item.split(/:\s*/);
    const name = items[0].replace(/([a-z])([A-Z])/g, '$1 $2');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    return [formattedName, items[1]];
    }


    return (
        <Card className='h-full w-full bg-white p-4'>
            <CardHeader className='flex'>
                <CardTitle className='text-2xl'>
                    Estimated Nutrition
                </CardTitle>
                <CardDescription className='text-dark-gray text-base !mt-0'>
                    Summary of nutritional values
                </CardDescription>
            </CardHeader>

            <CardContent className='flex flex-col gap-4'>
                <div className="flex w-80 h-40 self-center">
                    <NutritionalChart recipe={recipe} />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between border-b-2">
                        <h1>Serving Size</h1>
                        <h1>{recipe.servingSize}</h1>
                    </div>
                    <div className="flex flex-col gap-1">
                        {recipe.estimatedNutrition.map((nutrient: string) => {
                            return (
                                <div key={nutrient} className="flex flex-row justify-between border-b-2">
                                    <h1>{splitNutrient(nutrient)[0]}</h1>
                                    <h1>{splitNutrient(nutrient)[1]}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>

        </Card>
    );
}