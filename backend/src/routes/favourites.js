import express from "express";
import { getFavouritedRecipes, addFavouritedRecipes, removeFavouritedRecipe, checkIfRecipeInFavourites } from "../controllers/favouritesController.js";

const router = express.Router();

// GET favourited recipes by session id 
router.get("/:sessionId", getFavouritedRecipes);

// PUT (update) favourited recipe by session id 
router.put("/:sessionId", addFavouritedRecipes);

// DELETE a recipe from favorites
router.delete("/:sessionId", removeFavouritedRecipe);

// Check if recipe is favourited
router.post("/:sessionId", checkIfRecipeInFavourites)

export default router;