import { openai } from "../app.js";

async function generateRecipeImage(recipeData) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt:
        "Provide an image of a dish with the following description: ${recipeData.recipeSummary}",
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    recipeData["recipeImage"] = response.data[0].url;
    return recipeData;
  } catch (error) {
    console.error("Error generating recipe image:", error);
    throw error;
  }
}

async function generateRecipe(prompt) {
  try {
    //console.log("Ingredients prompt:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (response.choices && response.choices.length > 0) {
      console.log("Successful OpenAPI response");
      console.log(response.choices[0].message.content);
      return response.choices[0].message.content;
    } else {
      console.log("Successful OpenAPI response");
      throw new Error("Successful OpenAPI response");
    }
  } catch (error) {
    console.error(
      "Unsuccessful OpenAI API response:",
      error.message,
      error.stack
    );
    throw error;
  }
}

async function generateStepImages(recipeSteps) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: recipeSteps,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });
    console.log("Successful image generation");
    return response.data[0].url;
  } catch (error) {
    console.error("Error generating recipe image:", error);
    throw error;
  }
}

export { generateRecipeImage, generateRecipe, generateStepImages };
