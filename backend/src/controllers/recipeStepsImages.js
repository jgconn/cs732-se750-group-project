import { generateStepImages } from '../services/openaiService.js';

export const createRecipeImages = async (req, res) => {
    const formData = req.body;
    let steps = {};

    try {
        for (const step of formData) {
            const [stepNumber, stepText] = step.split(': ');
            steps[stepNumber] = await generateStepImages(stepText);
        }
        console.log(steps);
        res.status(200).json({ success: true, data: steps });
    } catch (error) {
        console.error('Error generating recipe images:', error);
        res.status(500).json({ success: false, error: 'Error generating recipe images' });
    }
}