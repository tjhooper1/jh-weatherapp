export interface ProbabilityOfPrecipitation {
    unitCode: string;
    value: number;
}

export interface ForecastPeriod {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: string | null;
    probabilityOfPrecipitation: ProbabilityOfPrecipitation;
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
}

export interface WeatherForecastResponse {
    properties: {
        periods: ForecastPeriod[];
    }
}

export interface AdaptedForecast {
    temperatureDescriptor: string;
    temperature: string;
    wind: string;
    shortForecast: string;
}

export interface WeatherPointsResponse {
    properties: {
        forecast: string;
        relativeLocation: {
            properties: {
                city: string;
                state: string;
            }
        }
    }
};

export type WeatherQueryParams = {
    lat: string;
    lon: string;
};
