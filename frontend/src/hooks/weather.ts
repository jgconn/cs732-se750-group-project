import { API_KEY } from '@/types/constants';
import axios from 'axios';

export async function loadWeatherDetail(lat:number, lon:number) {
    try {
        const apiRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = apiRes.data.dt * 1000 + localOffset;
        apiRes.data.currentTime = utc + 1000 * apiRes.data.timezone;
        return apiRes.data;
    } catch (error) {
        console.error('Failed to load weather data:', error);
        throw error; // Re-throw the error for handling in the component
    }
}
