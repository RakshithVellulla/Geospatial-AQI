import axios from 'axios';

// Replace with your actual API keys
const OPEN_WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const AIR_NOW_API_KEY = 'YOUR_AIRNOW_API_KEY';

// Get current air quality data from OpenWeatherMap
export const getAirQualityData = async (lat, lon) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
    );
    return response.data;
};

// Get historical air quality data from AirNow
export const getHistoricalAirQualityData = async (lat, lon, date) => {
    const response = await axios.get(
        `https://www.airnowapi.org/aq/observation/latLong/historical/?format=application/json&latitude=${lat}&longitude=${lon}&date=${date}&API_KEY=${AIR_NOW_API_KEY}`
    );
    return response.data;
};
