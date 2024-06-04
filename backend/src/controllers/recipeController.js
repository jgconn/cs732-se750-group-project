import {
  generateRecipeImage,
  generateRecipe,
} from "../services/openaiService.js";

const createPrompt = (formData) => {
  const ingredients = formData.ingredients.map((ingredient) => ingredient.name);

  /*
  Add assumeIngredients to ingredient schema (food_group, name)
  const assumedIngredients = ["Salt", "Pepper", "Sugar"];
  */

  let recipe = {
    ingredients: ingredients,
    maxCookingTime: formData.maxCookingTime,
    servingSize: formData.servingSize,
    restrictions: formData.restrictions,
    "weather": formData.weatherSearch[1],
    "temp": formData.weatherSearch[2],
    "location": formData.weatherSearch[3],
    "weatherImage": formData.weatherSearch[0],
  };

  const recipeJSON = JSON.stringify(recipe);
  const prompt = `You are an AI cooking assistant that generates recipes with constraints specified below, create a recipe with ONLY the following information (DO NOT include ingredients that are not specified) and return ONLY JSON Object of Recipe: 

  {
    "recipeName": String,
    "ingredients": [String],
    "maxCookingTime": String,
    "estimatedCookingTime": String,
    "estimatedPreparationTime": String,
    "servingSize": Int,
    "restrictions": [String],
    "instructions": [String],
    "estimatedNutrition": [String],
    "weather": [${formData.weatherSearch}, "weatherType", "temp", "location"]
    "recipeSummary": String
  }
  \`\`\`

  Weather conditions you must take into account for recipe generation are: 
  - weather condition: ${formData.weatherSearch[1]},
  - weather temperature: ${formData.weatherSearch[2]}, and 
  - weather location: ${formData.weatherSearch[3]}

  \`maxCookingTime\` should display maxCookingTime: ${formData.maxCookingTime} in minutes.

  \`estimatedCookingTime\` + \`estimatedPreparationTime\` must be <= ${formData.maxCookingTime}

  \`estimatedPreparationTime\` is the time the users needs to prepare ingredients for recipe.

  \`estimatedCookingTime\` is the time the users to complete instructions.

  
  You must follow these instructions as closely as possible:

  1/ \`maxCookingTime\` should display maxCookingTime: ${formData.maxCookingTime} in minutes, and must follow format: ${formData.maxCookingTime} minutes.
  2/ \`estimatedCookingTime\` + \`estimatedPreparationTime\` must be <= ${formData.maxCookingTime}
  3/ \`estimatedPreparationTime\` is the time the users needs to prepare ingredients for recipe, and must follow format: n minutes.
  4/ \`estimatedCookingTime\` is the time the users to complete instructions, and must follow format: n minutes.
  5/ \`estimatedCookingTime\` can be any time between \`[0 minutes, ${formData.maxCookingTime} minutes]\` based on how long to cook recipe. 
  6/ Ensure that \`ingredients\`, \`restrictions\`, \`instructions\`, and \`estimatedNutrition\` are all represented as arrays.
  7/ Ensure that there are no trailing commas in any of the arrays: \`ingredients\`, \`restrictions\`, \`instructions\`, and \`estimatedNutrition\`.
  8/ For every element n in \`instructions\` array, it should start with "n. " from 1 to infinity.
  9/ \`instructions\` should have detailed steps with measurements and amount of ingredients used, e.g., 200 grams of uncooked pasta.
  10/ \`instructions\` should have detailed steps with time if cooking is required, e.g., cook pasta for 20 minutes on medium heat.
  11/ Users must be able to follow instructions without using other resources.
  12/ When creating a recipe, you have the option to include all ingredients or select specific ones from ${formData.ingredients}. It's crucial to decide to include only the necessary ingredients from ${formData.ingredients}.
  13/ \`ingredients\` should only list ingredients used in \`instructions\`. Remove any ingredient from ${recipeJSON.ingredients} if \`instructions\` does not list ingredient.
  14/ \`ingredients\` should include amount needed for recipe for every ingredient in grams, e.g., "Asparagus: 200g".
  15/ Note: In the \`ingredients\` list, there are assumed ingredients: "Salt", "Pepper", and "Sugar". These ingredients are not always required but should be included in the recipe only if the generated recipe necessitates their use.  
  15/ \`estimatedPreparationTime\` should be how long to prepare ingredients for making recipe.
  16/ \`estimatedNutrition\` should estimate the nutrition values for the recipe based on \`ingredients\`, with n values for each: \`["calories: n", "totalFat: n", "saturatedFat: n", "transFat: n", "cholesterol: n", "sodium: n", "totalCarbohydrate: n", "dietaryFiber: n", "sugar: n", "protein: n"]\`. Every element in array is String.
  17/ Note: \`estimatedNutrition\` must follow this format with no changes on how elements are stored: estimatedNutrition: ['calories:450', 'totalFat:15g', 'saturatedFat:5g', ... ].
  18/ Note: n totalFat has subgroup n saturatedFat and n transFat in \`estimatedNutrition\`.
  19/ Note: n totalCarbohydrate has subgroup n dietaryFiber and n sugar,  in \`estimatedNutrition\`.
  20/ \`recipeSummary\` should have a small description summarizing the whole recipe so that dall-e can generate an image of what the recipe will look like.
  
  Information provided for the recipe:\n${recipeJSON} `;

  return prompt;
};

async function generateRecipeArray(prompt, numberOfRecipes) {
  try {
    const recipePromises = Array.from({ length: numberOfRecipes }, async () => {
      const recipeContent = await generateRecipe(prompt);
      let jsonString = recipeContent.replace(/,\s*]/g, "]");
      jsonString = jsonString.replace(/,\s*}/g, "}");

      const recipeData = JSON.parse(jsonString);

      return generateRecipeImage(recipeData);
    });

    const recipesWithImages = await Promise.all(recipePromises);
    return recipesWithImages;
  } catch (error) {
    console.error(
      "generateRecipeArray - Error generating recipes with images:",
      error.message
    );
    throw error;
  }
}

export const createRecipe = async (req, res) => {
  const formData = req.body;
  const prompt = createPrompt(formData);

  try {
    const recipeArray = await generateRecipeArray(prompt, 1);
    console.log(recipeArray);
    res.json({ success: true, data: recipeArray });
  } catch (error) {
    console.error("Error generating recipes with images:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createAdditionalRecipe = async (req, res) => {
  const formData = req.body;
  const prompt = createPrompt(formData);

  try {
    const output = await generateRecipe(prompt);
    const recipeData = JSON.parse(output);
    const outputFinal = await generateRecipeImage(recipeData);

    console.log(outputFinal);
    res.json({ success: true, data: outputFinal });
  } catch (error) {
    console.error("Error generating recipe:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
