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

describe('GET /api/session/:sessionId', () => {
    it('should return information about a session', async () => {

        const response = await api.get("/api/session/662c4c532def29c5991be103"); // dummy session

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined(); 
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('assumedIngredients');
        expect(response.body).toHaveProperty('favouritedRecipes');
        expect(response.body).toHaveProperty('historyRecipes');
    });
});