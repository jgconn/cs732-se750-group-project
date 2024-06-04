import { IngredientModel } from "../models/ingredientSchema.js";

export const getIngredients = async (req, res) => {
  try {
    const ingredients = await IngredientModel.find({});
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIngredientsStartingWith = async (req, res) => {
  const { prefix } = req.params;

  try {
    const ingredients = await IngredientModel.find({
      name: { $regex: `^${prefix}`, $options: "i" },
    })
    .select('-_id') // don't get _id field
    .sort({ name: 1 });
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIngredientsContaining = async (req, res) => {
  const { substring } = req.params;

  try {
    const ingredients = await IngredientModel.find({
      name: { $regex: substring, $options: "i" },
    })
    .select('-_id') // don't get _id 
    .sort({ name: 1 });
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleNoSubstring = async (req, res) => {
  res.status(204).send();
};
