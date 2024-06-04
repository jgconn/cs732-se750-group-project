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

describe('GET /api/ingredients/startingWith/:prefix', () => {
    it('should return ingredients starting with a given prefix', async () => {
        const expectedIngredient = {
            id: 7,
            name: 'Leek',
            food_group: 'Produce, dairy and animal products'
        };    

        const response = await api.get("/api/ingredients/startingWith/Lee");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body).toEqual([expectedIngredient])
    });
});

describe('GET /api/ingredients/containing/:substring', () => {
    it('should return ingredients containing a given substring', async () => {
        const expectedIngredient = [{
            id: 7,
            name: 'Leek',
            food_group: 'Produce, dairy and animal products'
        },
        {
            id: 382,
            name: "Wild leek",
            food_group: "Produce, dairy and animal products"
        }];    

        const response = await api.get("/api/ingredients/containing/Lee");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body).toEqual(expectedIngredient)
    });
});

