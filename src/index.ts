import express, { Request, Response } from 'express';
import { WeatherService } from './services/weatherService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const weatherService = new WeatherService();

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Weather API Server', status: 'running' });
});

// Get weather forecast by coordinates
app.get('/weather/:lat/:lon', async (req: Request, res: Response) => {
    try {
        const { lat, lon } = req.params;
        const forecast = await weatherService.getForecast(
            parseFloat(lat),
            parseFloat(lon)
        );
        res.json(forecast);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch weather data',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get weather alerts by coordinates
app.get('/alerts/:lat/:lon', async (req: Request, res: Response) => {
    try {
        const { lat, lon } = req.params;
        const alerts = await weatherService.getAlerts(
            parseFloat(lat),
            parseFloat(lon)
        );
        res.json(alerts);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch alerts',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
