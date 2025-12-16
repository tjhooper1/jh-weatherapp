import { TemperatureDescriptor } from "../constants";

export function mapTemperatureToDescriptor(temperature: number, unit: string): TemperatureDescriptor {
    if (unit === 'F') {
        switch (true) {
            case (temperature >= 85):
                return TemperatureDescriptor.Hot;
            case (temperature >= 70):
                return TemperatureDescriptor.Warm;
            case (temperature >= 50):
                return TemperatureDescriptor.Cool;
            default:
                return TemperatureDescriptor.Cold;
        }
    } else if (unit === 'C') {
        switch (true) {
            case (temperature >= 29.4):
                return TemperatureDescriptor.Hot;
            case (temperature >= 21.1):
                return TemperatureDescriptor.Warm;
            case (temperature >= 10):
                return TemperatureDescriptor.Cool;
            default:
                return TemperatureDescriptor.Cold;
        }
    } else {
        //opt for logging instead of throwing in case of unexpected unit
        console.log(`Unsupported temperature unit: ${unit}`);
        return TemperatureDescriptor.Cool; // Default fallback
    }
}