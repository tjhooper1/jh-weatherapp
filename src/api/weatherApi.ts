import axios from "axios";
import { USER_AGENT, WEATHER_API_BASE_URL } from "../constants";
import { WeatherForecastResponse, WeatherPointsResponse, } from "../types/weather";

/**
 * API call to fetch specific weather points data that will help us zero in on a forecast. 
 * Example can be found at https://www.weather.gov/documentation/services-web-api click on "Examples" and read the "How do I get forecast?" section.
 */
export async function getWeatherPoints(lat: number, lon: number): Promise<WeatherPointsResponse> {
    const response = await axios.get(`${WEATHER_API_BASE_URL}/points/${lat},${lon}`, {
        headers: {
            'User-Agent': USER_AGENT,
            'Accept': 'application/geo+json'
        }
    });

    return response.data;
}

export async function getWeatherForecast(url: string): Promise<WeatherForecastResponse> {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': USER_AGENT,
            'Accept': 'application/geo+json'
        }
    });

    return response.data;
}