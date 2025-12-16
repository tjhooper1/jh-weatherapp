import { mapTemperatureToDescriptor } from '../mapTemperature';
import { TemperatureDescriptor } from '../../constants';

describe('mapTemperatureToDescriptor', () => {
    describe('Fahrenheit temperatures', () => {
        it('should return Hot for temperatures >= 85°F', () => {
            expect(mapTemperatureToDescriptor(85, 'F')).toBe(TemperatureDescriptor.Hot);
            expect(mapTemperatureToDescriptor(90, 'F')).toBe(TemperatureDescriptor.Hot);
            expect(mapTemperatureToDescriptor(100, 'F')).toBe(TemperatureDescriptor.Hot);
        });

        it('should return Warm for temperatures 70-84°F', () => {
            expect(mapTemperatureToDescriptor(70, 'F')).toBe(TemperatureDescriptor.Warm);
            expect(mapTemperatureToDescriptor(75, 'F')).toBe(TemperatureDescriptor.Warm);
            expect(mapTemperatureToDescriptor(84, 'F')).toBe(TemperatureDescriptor.Warm);
        });

        it('should return Cool for temperatures 50-69°F', () => {
            expect(mapTemperatureToDescriptor(50, 'F')).toBe(TemperatureDescriptor.Cool);
            expect(mapTemperatureToDescriptor(60, 'F')).toBe(TemperatureDescriptor.Cool);
            expect(mapTemperatureToDescriptor(69, 'F')).toBe(TemperatureDescriptor.Cool);
        });

        it('should return Cold for temperatures < 50°F', () => {
            expect(mapTemperatureToDescriptor(49, 'F')).toBe(TemperatureDescriptor.Cold);
            expect(mapTemperatureToDescriptor(32, 'F')).toBe(TemperatureDescriptor.Cold);
            expect(mapTemperatureToDescriptor(0, 'F')).toBe(TemperatureDescriptor.Cold);
            expect(mapTemperatureToDescriptor(-10, 'F')).toBe(TemperatureDescriptor.Cold);
        });
    });

    describe('Celsius temperatures', () => {
        it('should return Hot for temperatures >= 29.4°C', () => {
            expect(mapTemperatureToDescriptor(29.4, 'C')).toBe(TemperatureDescriptor.Hot);
            expect(mapTemperatureToDescriptor(35, 'C')).toBe(TemperatureDescriptor.Hot);
            expect(mapTemperatureToDescriptor(40, 'C')).toBe(TemperatureDescriptor.Hot);
        });

        it('should return Warm for temperatures 21.1-29.3°C', () => {
            expect(mapTemperatureToDescriptor(21.1, 'C')).toBe(TemperatureDescriptor.Warm);
            expect(mapTemperatureToDescriptor(25, 'C')).toBe(TemperatureDescriptor.Warm);
            expect(mapTemperatureToDescriptor(29.3, 'C')).toBe(TemperatureDescriptor.Warm);
        });

        it('should return Cool for temperatures 10-21.0°C', () => {
            expect(mapTemperatureToDescriptor(10, 'C')).toBe(TemperatureDescriptor.Cool);
            expect(mapTemperatureToDescriptor(15, 'C')).toBe(TemperatureDescriptor.Cool);
            expect(mapTemperatureToDescriptor(21.0, 'C')).toBe(TemperatureDescriptor.Cool);
        });

        it('should return Cold for temperatures < 10°C', () => {
            expect(mapTemperatureToDescriptor(9, 'C')).toBe(TemperatureDescriptor.Cold);
            expect(mapTemperatureToDescriptor(0, 'C')).toBe(TemperatureDescriptor.Cold);
            expect(mapTemperatureToDescriptor(-5, 'C')).toBe(TemperatureDescriptor.Cold);
        });
    });

    describe('Unsupported units', () => {
        it('should return Cool and log warning for unsupported units', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            expect(mapTemperatureToDescriptor(75, 'K')).toBe(TemperatureDescriptor.Cool);
            expect(consoleSpy).toHaveBeenCalledWith('Unsupported temperature unit: K');

            expect(mapTemperatureToDescriptor(20, 'X')).toBe(TemperatureDescriptor.Cool);
            expect(consoleSpy).toHaveBeenCalledWith('Unsupported temperature unit: X');

            consoleSpy.mockRestore();
        });
    });

    describe('Boundary conditions', () => {
        it('should handle exact boundary values correctly', () => {
            // Fahrenheit boundaries
            expect(mapTemperatureToDescriptor(85, 'F')).toBe(TemperatureDescriptor.Hot);
            expect(mapTemperatureToDescriptor(84.99, 'F')).toBe(TemperatureDescriptor.Warm);
            expect(mapTemperatureToDescriptor(70, 'F')).toBe(TemperatureDescriptor.Warm);
            expect(mapTemperatureToDescriptor(69.99, 'F')).toBe(TemperatureDescriptor.Cool);
            expect(mapTemperatureToDescriptor(50, 'F')).toBe(TemperatureDescriptor.Cool);
            expect(mapTemperatureToDescriptor(49.99, 'F')).toBe(TemperatureDescriptor.Cold);

            // Celsius boundaries
            expect(mapTemperatureToDescriptor(29.4, 'C')).toBe(TemperatureDescriptor.Hot);
            expect(mapTemperatureToDescriptor(29.39, 'C')).toBe(TemperatureDescriptor.Warm);
            expect(mapTemperatureToDescriptor(21.1, 'C')).toBe(TemperatureDescriptor.Warm);
            expect(mapTemperatureToDescriptor(21.09, 'C')).toBe(TemperatureDescriptor.Cool);
            expect(mapTemperatureToDescriptor(10, 'C')).toBe(TemperatureDescriptor.Cool);
            expect(mapTemperatureToDescriptor(9.99, 'C')).toBe(TemperatureDescriptor.Cold);
        });
    });
});
