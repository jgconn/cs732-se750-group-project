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

describe('PUT /api/history/:sessionId', () => {
    it('should put a recipe into history', async () => {
        const queryBody = {
            recipeName: "Test",
            recipeImage: "https://picsum.photos/seed/picsum/200/300", // example
            ingredients: [
              "Test1",
              "Test2"
            ],
            maxCookingTime: "30 minutes",
            estimatedCookingTime: "20 minutes",
            estimatedPreparationTime: "10 minutes",
            servingSize: "2",
            restrictions: ["None"],
            estimatedNutrition: ["Calories: 600", "Protein: 25g", "Carbs: 70g", "Fat: 25g"],
            recipeSummary: "Classic Italian pasta dish with eggs, cheese, and pancetta",
            instructions: ["Cook the spaghetti according to package instructions until al dente.", "In a separate pan, fry pancetta until crispy.",]
          };

        const response = await api.put("/api/history/662c4c532def29c5991be103").send(queryBody);
        expect(response.status).toBe(201);
    });
});

describe('GET /api/history/:sessionId', () => {
    it('should return recipes in history', async () => {
        const response = await api.get("/api/history/662c4c532def29c5991be103");
        expect(response.status).toBe(200);
    });
});