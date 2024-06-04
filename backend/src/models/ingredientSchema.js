export { IngredientModel };

import mongoose from 'mongoose';

const ingredientsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  food_group: {
    type: String,
    required: true,
  },
});

const IngredientModel = mongoose.model('ingredients', ingredientsSchema);
