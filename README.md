## Weather Service

This project provides a simple weather service API that allows users to retrieve current weather information for a specified latitude and longitude. The service is built using Node.js and Express, and it fetches data from this [Weather API](https://www.weather.gov/documentation/services-web-api)

### How to install and run

1. Clone the repository:
   ```bash
    git clone

    cd weatherapp
    ```

2. Install dependencies:
   ```bash
    npm install
    ```
3. Start the server:
   ```bash
    npm run dev
    ```

4. Alternatively, you can build and run the production version:
   ```bash
    npm run build
    npm start
    ```
   The server will run on `http://localhost:3000`.
5. Make a request to the weather endpoint:
    ```bash
     curl "http://localhost:3000/weather?lat=39.7456&lon=-97.0892"
     ```
    Replace `39.7456` and `-97.0892` with the desired latitude and longitude values.

### API Endpoint
- `GET /weather?lat={latitude}&lon={longitude}`: Retrieves current weather information for the specified latitude and longitude.

### Example Response
```json
{
    "temperatureDescriptor": "Cold",
    "temperature": "23°F",
    "wind": "5 mph from SW",
    "shortForecast": "Partly Cloudy"
}
```