import express, { Request, Response } from 'express';
import { WeatherService } from './services/weatherService';
import { WeatherQueryParams } from './types/weather';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const weatherService = new WeatherService();

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Weather API Server', status: 'running' });
});

// Get weather forecast by coordinates
app.get('/weather', async (req: Request, res: Response) => {
    try {
        const { lat, lon } = req.query as WeatherQueryParams;
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Missing required query parameters: lat and lon' });
        }
        const forecast = await weatherService.getForecast(lat, lon)
        res.json(forecast);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch weather data',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🌧️`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please stop the other server or use a different port.`);
        process.exit(1);
    } else {
        console.error('Server error:', error);
        process.exit(1);
    }
});
