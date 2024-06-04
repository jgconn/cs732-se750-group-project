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

describe('POST /api/createSession/:username', () => {
    it('should create a new session and return unique id', async () => {

        const response = await api.post("/api/createSession/Test");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined(); 
        expect(response.body).toHaveProperty('_id'); 
        
        const sessionId = response.body._id;
        expect(sessionId).toBeTruthy(); // Ensure _id is not null or undefined

        // Check if _id is a valid MongoDB ObjectId
        const isValidObjectId = mongoose.Types.ObjectId.isValid(sessionId);
        expect(isValidObjectId).toBe(true);
    });
});