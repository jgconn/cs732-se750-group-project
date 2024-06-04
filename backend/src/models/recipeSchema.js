export { RecipeModel };

import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  recipeImage: {
    type: String, // base64 string format
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  maxCookingTime: {
    type: String,
    required: true,
  },
  estimatedCookingTime: {
    type: String,
    required: true,
  },
  estimatedPreparationTime: {
    type: String,
    required: true,
  },
  servingSize: {
    type: String,
    required: true,
  },
  restrictions: {
    type: [String],
    required: true,
  },
  estimatedNutrition: {
    type: [String],
    required: true,
  },
  recipeSummary: {
    type: String,
    required: true,
  },
  dateGenerated: {
    type: Date,
  },
  instructions: [String]
});

const RecipeModel = mongoose.model("recipes", recipeSchema);
