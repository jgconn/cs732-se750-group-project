import { RecipeModel } from "../models/recipeSchema.js";
import { SessionModel } from "../models/sessionSchema.js";
import axios from "axios";

// Get history of last 10 viewed recipes
export const getHistory = async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Find session and populate history with recipe details
    const session = await SessionModel.findById(sessionId).populate(
      "historyRecipes.recipeId"
    );
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Extract favourited recipes from session
    const historyRecipes = session.historyRecipes.map((hisRecipe) => {
      const { recipeId } = hisRecipe;
      const {
        recipeName,
        recipeImage, // Assuming recipeImage is stored as base64 string
        ingredients,
        maxCookingTime,
        estimatedCookingTime,
        estimatedPreparationTime,
        servingSize,
        restrictions,
        estimatedNutrition,
        recipeSummary,
        instructions,
      } = recipeId;

      return {
        recipeName,
        recipeImage,
        ingredients,
        maxCookingTime,
        estimatedCookingTime,
        estimatedPreparationTime,
        servingSize,
        restrictions,
        estimatedNutrition,
        recipeSummary,
        instructions,
      };
    });

    res.status(200).json({ historyRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add recipe to history
export const addToHistory = async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Extract recipe details from request body
    const {
      recipeName,
      recipeImage,
      ingredients,
      maxCookingTime,
      estimatedCookingTime,
      estimatedPreparationTime,
      servingSize,
      restrictions,
      estimatedNutrition,
      recipeSummary,
      instructions,
    } = req.body;

    // Check if all required fields are present
    const requiredFields = [
      "recipeName",
      "recipeImage",
      "ingredients",
      "maxCookingTime",
      "estimatedCookingTime",
      "estimatedPreparationTime",
      "servingSize",
      "restrictions",
      "estimatedNutrition",
      "recipeSummary",
      "instructions",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Find session document by session ID
    const session = await SessionModel.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Check if recipe already exists in historyRecipes
    for (const historyRecipe of session.historyRecipes) {
      const recipe = await RecipeModel.findById(historyRecipe.recipeId);
      // If exists, don't add to history again
      if (
        recipe &&
        recipe.recipeName === recipeName &&
        recipe.recipeSummary === recipeSummary
      ) {
        return res.status(201).json({ message: "Recipe already in history" });
      }
    }

    // Note: this demo branch stores image URLs directly
    // To save images permanently, use the base64-version branch

    // Encode recipe image to base64
    // const base64String = await encodeImageToBase64(recipeImage);

    const newRecipe = new RecipeModel({
      recipeName,
      recipeImage,
      ingredients,
      maxCookingTime,
      estimatedCookingTime,
      estimatedPreparationTime,
      servingSize,
      restrictions,
      estimatedNutrition,
      recipeSummary,
      instructions,
      dateGenerated: new Date(),
    });

    await newRecipe.save();

    // Add reference to newly created recipe under session
    session.historyRecipes.push({ recipeId: newRecipe._id });

    // Only keep last 10 recipes in history
    if (session.historyRecipes.length > 10) {
      session.historyRecipes.sort(
        (a, b) => a.recipeId.dateGenerated - b.recipeId.dateGenerated
      );
      // Remove oldest recipe (both document and reference)
      const oldestRecipeId = session.historyRecipes[0].recipeId;
      await RecipeModel.findByIdAndDelete(oldestRecipeId);
      session.historyRecipes.shift();
    }

    await session.save();

    res.status(201).json({ message: "Recipe successfully added to history" });
  } catch (error) {
    console.error("Error adding recipe to history.", error);
    res.status(500).json({ message: "Error: failed to encode imageURL" });
  }
};

// Helper function to encode image to base64
const encodeImageToBase64 = async (imageURL) => {
  try {
    const response = await axios.get(imageURL, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data);
    const base64String = imageBuffer.toString("base64");
    return base64String;
  } catch (error) {
    throw new Error(`Failed to encode image: ${error.message}`);
  }
};
