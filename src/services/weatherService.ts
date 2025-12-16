export class WeatherService {
    private readonly baseURL = 'https://api.weather.gov';
    private readonly userAgent = '(weatherapp, contact@example.com)';

    private async fetchFromAPI(url: string): Promise<any> {
        const response = await fetch(url, {
            headers: {
                'User-Agent': this.userAgent,
                'Accept': 'application/geo+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async getForecast(latitude: number, longitude: number): Promise<any> {
        try {
            // First, get the grid point data
            const pointData = await this.fetchFromAPI(
                `${this.baseURL}/points/${latitude},${longitude}`
            );

            // Extract the forecast URL from the point data
            const forecastUrl = pointData.properties.forecast;

            // Fetch the actual forecast
            const forecastData = await this.fetchFromAPI(forecastUrl);

            return {
                location: {
                    city: pointData.properties.relativeLocation.properties.city,
                    state: pointData.properties.relativeLocation.properties.state
                },
                forecast: forecastData.properties.periods
            };
        } catch (error) {
            throw new Error(`Failed to fetch forecast: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async getAlerts(latitude: number, longitude: number): Promise<any> {
        try {
            // Get alerts for the point
            const alertsData = await this.fetchFromAPI(
                `${this.baseURL}/alerts/active?point=${latitude},${longitude}`
            );

            return {
                count: alertsData.features.length,
                alerts: alertsData.features.map((feature: any) => ({
                    event: feature.properties.event,
                    severity: feature.properties.severity,
                    urgency: feature.properties.urgency,
                    headline: feature.properties.headline,
                    description: feature.properties.description,
                    instruction: feature.properties.instruction
                }))
            };
        } catch (error) {
            throw new Error(`Failed to fetch alerts: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
