import { IngredientModel } from "../models/ingredientSchema.js";

export const getMainIngredients = async (req, res) => {
  const categories = {
    "Meat, seafood and other proteins": [
      "Beef",
      "Pork",
      "Fish",
      "Tofu",
      "Ham",
      "Sausages",
      "Shrimp",
      "Crab",
      "Chicken",
      "Duck",
    ],
    "Produce, dairy and animal products": [
      "Eggs",
      "Milk",
      "Butter",
      "Cheese",
      "Onion",
      "Garlic",
      "Carrot",
      "Potato",
      "Lettuce",
      "Apple",
    ],
    "Carbohydrates, fats and oils": [
      "Oat",
      "Bread",
      "Lentils",
      "Nuts",
      "Oil",
      "Cereal",
      "Rice",
      "Pasta",
      "Beans",
      "Seeds",
    ],
    Essentials: [
      "Tomato sauce",
      "BBQ sauce",
      "Soy sauce",
      "Onion powder",
      "Garlic powder",
      "Mayonnaise",
      "Flour",
      "Baking powder",
      "Hot sauce",
      "Cinnamon",
    ],
  };

  try {
    let allIngredients = [];

    for (const category in categories) {
      const ingredients = await IngredientModel.find({
        name: { $in: categories[category] },
      }).sort({ name: 1 });

      allIngredients.push({
        title: category,
        ingredients: ingredients,
      });
    }

    res.json(allIngredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
