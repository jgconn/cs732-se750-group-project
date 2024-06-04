import express from "express";
import ingredients from "./ingredients.js";
import { getMainIngredients } from "../controllers/mainIngredientsController.js";
import sessionInfo from "./sessionInfo.js";
import newSession from "./newSession.js";
import favourites from "./favourites.js";
import history from "./history.js";
import {
  createRecipe,
  createAdditionalRecipe,
} from "../controllers/recipeController.js";
import { createRecipeImages } from "../controllers/recipeStepsImages.js";

const router = express.Router();

router.use("/ingredients", ingredients);
router.use("/session", sessionInfo);
router.use("/createSession", newSession);
router.use("/favourites", favourites);
router.use("/history", history);
router.get("/mainIngredients", getMainIngredients);
router.post("/recipe", createRecipe);
router.post("/instructions", createRecipeImages);
router.post("/additionalRecipe", createAdditionalRecipe);

export default router;
