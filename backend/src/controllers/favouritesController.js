import { RecipeModel } from "../models/recipeSchema.js";
import { SessionModel } from "../models/sessionSchema.js";
import axios from "axios";

// Get favourited recipes by session id
export const getFavouritedRecipes = async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Find session and populate favourited recipes with recipe details
    const session = await SessionModel.findById(sessionId).populate(
      "favouritedRecipes.recipeId"
    );
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Extract favourited recipes from session
    const favouritedRecipes = session.favouritedRecipes.map((favRecipe) => {
      const { recipeId } = favRecipe;
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

    res.status(200).json({ favouritedRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add recipe under Favourites
export const addFavouritedRecipes = async (req, res) => {
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

    // Find session document by session ID
    const session = await SessionModel.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Add reference to newly created recipe under session
    session.favouritedRecipes.push({ recipeId: newRecipe._id });
    await session.save();

    res.status(201).json({ message: "Favourite recipe added successfully" });
  } catch (error) {
    console.error("Error adding recipe to favourites.", error);
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

// Remove recipe from favourites
export const removeFavouritedRecipe = async (req, res) => {
  const { sessionId } = req.params;
  const { recipeName, recipeSummary } = req.body;

  try {
    // Find session by session ID
    const session = await SessionModel.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Check if recipe exists
    const recipe = await RecipeModel.findOne({
      recipeName: recipeName,
      recipeSummary: recipeSummary,
    });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Remove reference to recipe
    const updatedFavourites = session.favouritedRecipes.filter(
      (favRecipe) => favRecipe.recipeId.toString() !== recipe._id.toString()
    );
    session.favouritedRecipes = updatedFavourites;

    await session.save();

    // Remove recipe from recipes collection
    await RecipeModel.findByIdAndDelete(recipe._id);

    res.status(200).json({
      message: "Recipe removed from favourites and deleted from collection",
    });
  } catch (error) {
    console.error("Error removing recipe from favourites:", error);
    res.status(500).json({ error: "Error removing recipe from favourites" });
  }
};

// Check if a recipe has been favourited
export const checkIfRecipeInFavourites = async (req, res) => {
  const { sessionId } = req.params;
  const { recipeName, recipeSummary } = req.body;

  try {
    // Find session and populate favourited recipes
    const session = await SessionModel.findById(sessionId).populate(
      "favouritedRecipes.recipeId"
    );
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Check if specified recipe has been favourited
    const isFavourited = session.favouritedRecipes.some((favRecipe) => {
      const { recipeId } = favRecipe;
      return (
        recipeId.recipeName === recipeName &&
        recipeId.recipeSummary === recipeSummary
      );
    });

    // Return true or false
    res.status(200).json(isFavourited);
  } catch (error) {
    console.error("Error checking if recipe is favourited:", error);
    res.status(500).json({ error: "Error checking if recipe is favourited" });
  }
};
