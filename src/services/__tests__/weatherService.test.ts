import { WeatherService } from '../weatherService';
import { getWeatherForecast, getWeatherPoints } from '../../api/weatherApi';

jest.mock('../../api/weatherApi');
jest.mock('../../lib/mapTemperature', () => ({
    mapTemperatureToDescriptor: jest.fn(() => 'Cold'),
}));

const mockedGetWeatherForecast = getWeatherForecast as jest.MockedFunction<
    typeof getWeatherForecast
>;
const mockedGetWeatherPoints = getWeatherPoints as jest.MockedFunction<
    typeof getWeatherPoints
>;

describe('WeatherService', () => {
    let weatherService: WeatherService;

    beforeEach(() => {
        weatherService = new WeatherService();
        jest.clearAllMocks();
    });

    describe('getForecast', () => {
        it('should return adapted forecast data', async () => {
            const mockPointData = {
                properties: {
                    forecast: 'https://api.weather.gov/gridpoints/TOP/31,80/forecast',
                    relativeLocation: {
                        properties: {
                            city: 'Linn',
                            state: 'KS',
                        },
                    },
                },
            };

            const mockForecastData = {
                properties: {
                    periods: [
                        {
                            number: 1,
                            name: 'Tonight',
                            startTime: '2025-12-15T21:00:00-06:00',
                            endTime: '2025-12-16T06:00:00-06:00',
                            isDaytime: false,
                            temperature: 23,
                            temperatureUnit: 'F',
                            temperatureTrend: null,
                            probabilityOfPrecipitation: {
                                unitCode: 'wmoUnit:percent',
                                value: 0,
                            },
                            windSpeed: '5 mph',
                            windDirection: 'SW',
                            icon: 'https://api.weather.gov/icons/land/night/few',
                            shortForecast: 'Mostly Clear',
                            detailedForecast: 'Clear tonight.',
                        },
                    ],
                },
            };

            mockedGetWeatherPoints.mockResolvedValueOnce(mockPointData);
            mockedGetWeatherForecast.mockResolvedValueOnce(mockForecastData);

            const result = await weatherService.getForecast('39.7456', '-97.0892');

            expect(result).toEqual({
                temperatureDescriptor: 'Cold',
                temperature: '23°F',
                wind: '5 mph from SW',
                shortForecast: 'Mostly Clear',
            });

            expect(mockedGetWeatherPoints).toHaveBeenCalledWith(39.7456, -97.0892);
            expect(mockedGetWeatherForecast).toHaveBeenCalledWith(
                mockPointData.properties.forecast
            );
        });

        it('should parse coordinates correctly', async () => {
            const mockPointData = {
                properties: {
                    forecast: 'https://api.weather.gov/test',
                    relativeLocation: {
                        properties: {
                            city: 'Test',
                            state: 'TS',
                        },
                    },
                },
            };

            const mockForecastData = {
                properties: {
                    periods: [
                        {
                            number: 1,
                            name: 'Tonight',
                            startTime: '2025-12-15T21:00:00-06:00',
                            endTime: '2025-12-16T06:00:00-06:00',
                            isDaytime: false,
                            temperature: 50,
                            temperatureUnit: 'F',
                            temperatureTrend: null,
                            probabilityOfPrecipitation: {
                                unitCode: 'wmoUnit:percent',
                                value: 0,
                            },
                            windSpeed: '10 mph',
                            windDirection: 'N',
                            icon: 'https://api.weather.gov/icons/land/night/few',
                            shortForecast: 'Clear',
                            detailedForecast: 'Clear.',
                        },
                    ],
                },
            };

            mockedGetWeatherPoints.mockResolvedValueOnce(mockPointData);
            mockedGetWeatherForecast.mockResolvedValueOnce(mockForecastData);

            await weatherService.getForecast('40.7128', '-74.0060');

            expect(mockedGetWeatherPoints).toHaveBeenCalledWith(40.7128, -74.006);
        });

        it('should throw error for invalid coordinates', async () => {
            await expect(
                weatherService.getForecast('999', '999')
            ).rejects.toThrow('Invalid coordinates');
        });

        it('should throw error when point data fetch fails', async () => {
            mockedGetWeatherPoints.mockRejectedValue(new Error('API Error'));

            await expect(
                weatherService.getForecast('39.7456', '-97.0892')
            ).rejects.toThrow('Failed to fetch forecast');
        });

        it('should throw error when forecast data fetch fails', async () => {
            const mockPointData = {
                properties: {
                    forecast: 'https://api.weather.gov/gridpoints/TOP/31,80/forecast',
                    relativeLocation: {
                        properties: {
                            city: 'Linn',
                            state: 'KS',
                        },
                    },
                },
            };

            mockedGetWeatherPoints.mockResolvedValueOnce(mockPointData);
            mockedGetWeatherForecast.mockRejectedValueOnce(
                new Error('Forecast API Error')
            );

            await expect(
                weatherService.getForecast('39.7456', '-97.0892')
            ).rejects.toThrow('Failed to fetch forecast');
        });
    });
});
