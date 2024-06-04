import express from "express";
import {
  getIngredients,
  getIngredientsStartingWith,
  getIngredientsContaining,
  handleNoSubstring,
} from "../controllers/ingredientsController.js";

const router = express.Router();

router.get("/", getIngredients);
router.get("/startingWith/:prefix", getIngredientsStartingWith);
router.get("/containing/", handleNoSubstring);
router.get("/containing/:substring", getIngredientsContaining);

export default router;
