export { SessionModel };

import mongoose from 'mongoose'
import { Schema } from 'mongoose';

const sessionSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    assumedIngredients: {
        type: [String], 
        default: ['salt', 'sugar', 'pepper'] 
    },
    favouritedRecipes: [{
        recipeId: { type: Schema.Types.ObjectId, ref: 'recipes' }
    }],
    historyRecipes: [{
        recipeId: { type: Schema.Types.ObjectId, ref: 'recipes' }
    }]
});

const SessionModel = mongoose.model('sessions', sessionSchema)
