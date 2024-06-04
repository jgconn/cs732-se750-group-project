import supertest from 'supertest'
import { app } from '../src/app.js'
import mongoose from 'mongoose';
const api = supertest(app);

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://pantrypal:XfW8RWN4E0T0S0I4@cluster0.hv52bwd.mongodb.net/PantryPal?retryWrites=true&w=majority&appName=Cluster0');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/mainIngredients', () => {
    it('should return main ingredients', async () => {
        const mainIngredient = 
            [
                {
                  "title": "Meat, seafood and other proteins",
                  "ingredients": [
                    {
                      "_id": "662321f18965839f228db1eb",
                      "id": 473,
                      "name": "Beef",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db14f",
                      "id": 317,
                      "name": "Chicken",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db235",
                      "id": 547,
                      "name": "Crab",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db166",
                      "id": 340,
                      "name": "Duck",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db2eb",
                      "id": 729,
                      "name": "Fish",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db35f",
                      "id": 845,
                      "name": "Ham",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db211",
                      "id": 511,
                      "name": "Pork",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db26a",
                      "id": 600,
                      "name": "Sausages",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db20e",
                      "id": 508,
                      "name": "Shrimp",
                      "food_group": "Meat, seafood and other proteins"
                    },
                    {
                      "_id": "662321f18965839f228db28a",
                      "id": 632,
                      "name": "Tofu",
                      "food_group": "Meat, seafood and other proteins"
                    }
                  ]
                },
                {
                  "title": "Produce, dairy and animal products",
                  "ingredients": [
                    {
                      "_id": "662321f18965839f228db07b",
                      "id": 105,
                      "name": "Apple",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db266",
                      "id": 596,
                      "name": "Butter",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db107",
                      "id": 245,
                      "name": "Carrot",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db259",
                      "id": 583,
                      "name": "Cheese",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db25b",
                      "id": 585,
                      "name": "Eggs",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db01a",
                      "id": 8,
                      "name": "Garlic",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db071",
                      "id": 95,
                      "name": "Lettuce",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db25a",
                      "id": 584,
                      "name": "Milk",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db2e4",
                      "id": 722,
                      "name": "Onion",
                      "food_group": "Produce, dairy and animal products"
                    },
                    {
                      "_id": "662321f18965839f228db0c1",
                      "id": 175,
                      "name": "Potato",
                      "food_group": "Produce, dairy and animal products"
                    }
                  ]
                },
                {
                  "title": "Carbohydrates, fats and oils",
                  "ingredients": [
                    {
                      "_id": "662321f18965839f228db25d",
                      "id": 587,
                      "name": "Beans",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db357",
                      "id": 837,
                      "name": "Bread",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db11e",
                      "id": 268,
                      "name": "Cereal",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db074",
                      "id": 98,
                      "name": "Lentils",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db2ed",
                      "id": 731,
                      "name": "Nuts",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db028",
                      "id": 22,
                      "name": "Oat",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db246",
                      "id": 564,
                      "name": "Oil",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db120",
                      "id": 270,
                      "name": "Pasta",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db08f",
                      "id": 125,
                      "name": "Rice",
                      "food_group": "Carbohydrates, fats and oils"
                    },
                    {
                      "_id": "662321f18965839f228db13d",
                      "id": 299,
                      "name": "Seeds",
                      "food_group": "Essentials"
                    }
                  ]
                },
                {
                  "title": "Essentials",
                  "ingredients": [
                    {
                      "_id": "662321f18965839f228db360",
                      "id": 846,
                      "name": "BBQ sauce",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db364",
                      "id": 850,
                      "name": "Baking powder",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db234",
                      "id": 546,
                      "name": "Cinnamon",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db2c4",
                      "id": 690,
                      "name": "Flour",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db362",
                      "id": 848,
                      "name": "Garlic powder",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db365",
                      "id": 851,
                      "name": "Hot sauce",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db363",
                      "id": 849,
                      "name": "Mayonnaise",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db361",
                      "id": 847,
                      "name": "Onion powder",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db288",
                      "id": 630,
                      "name": "Soy sauce",
                      "food_group": "Essentials"
                    },
                    {
                      "_id": "662321f18965839f228db2a5",
                      "id": 659,
                      "name": "Tomato sauce",
                      "food_group": "Essentials"
                    }
                  ]
                }
              ];    

        const response = await api.get("/api/mainIngredients");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(4); // 4 categories
        expect(response.body).toEqual(mainIngredient)
    });
});