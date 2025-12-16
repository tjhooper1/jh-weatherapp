import { getWeatherForecast, getWeatherPoints } from "../api/weatherApi";
import { mapTemperatureToDescriptor } from "../lib/mapTemperature";
import { validateCoordinates } from "../lib/validateCoordinates";
import { AdaptedForecast, WeatherForecastResponse, WeatherPointsResponse } from "../types/weather";

export class WeatherService {

    async getForecast(latitude: string, longitude: string): Promise<AdaptedForecast> {
        try {
            const lat = parseFloat(latitude);
            const lon = parseFloat(longitude);
            
            if (!validateCoordinates(lat, lon)) {
                throw new Error("Invalid coordinates");
            }

            const pointData: WeatherPointsResponse = await getWeatherPoints(lat, lon);

            // Extract the forecast URL from the point data
            const forecastUrl = pointData.properties.forecast;

            // Fetch the actual forecast
            const forecastData: WeatherForecastResponse = await getWeatherForecast(forecastUrl);

            return this.adaptForecastData(forecastData);
        } catch (error) {
            throw new Error(`Failed to fetch forecast: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private adaptForecastData(data: WeatherForecastResponse): AdaptedForecast {
        const todayForecast = data.properties.periods[0];
        return {
            temperatureDescriptor: mapTemperatureToDescriptor(todayForecast.temperature, todayForecast.temperatureUnit),
            temperature: `${todayForecast.temperature}°${todayForecast.temperatureUnit}`,
            wind: `${todayForecast.windSpeed} from ${todayForecast.windDirection}`,
            shortForecast: todayForecast.shortForecast,
        };
    }
}
