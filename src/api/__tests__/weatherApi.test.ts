import axios from 'axios';
import { getWeatherForecast, getWeatherPoints } from '../weatherApi';
import { WEATHER_API_BASE_URL } from '../../constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('weatherApi', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getWeatherPoints', () => {
        it('should fetch weather points data successfully', async () => {
            const mockData = {
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

            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getWeatherPoints(39.7456, -97.0892);

            expect(result).toEqual(mockData);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${WEATHER_API_BASE_URL}/points/39.7456,-97.0892`,
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'User-Agent': expect.any(String),
                        Accept: 'application/geo+json',
                    }),
                })
            );
        });

        it('should throw error when API request fails', async () => {
            const errorMessage = 'Network error';
            mockedAxios.get.mockRejectedValue(new Error(errorMessage));

            await expect(getWeatherPoints(39.7456, -97.0892)).rejects.toThrow(
                errorMessage
            );
        });
    });

    describe('getWeatherForecast', () => {
        it('should fetch weather forecast data successfully', async () => {
            const mockData = {
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
                            detailedForecast: 'Mostly clear tonight.',
                        },
                    ],
                },
            };

            mockedAxios.get.mockResolvedValue({ data: mockData });

            const url = 'https://api.weather.gov/gridpoints/TOP/31,80/forecast';
            const result = await getWeatherForecast(url);

            expect(result).toEqual(mockData);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                url,
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'User-Agent': expect.any(String),
                        Accept: 'application/geo+json',
                    }),
                })
            );
        });

        it('should throw error when API request fails', async () => {
            const errorMessage = 'Network error';
            mockedAxios.get.mockRejectedValue(new Error(errorMessage));

            const url = 'https://api.weather.gov/gridpoints/TOP/31,80/forecast';

            await expect(getWeatherForecast(url)).rejects.toThrow(errorMessage);
        });
    });
});
