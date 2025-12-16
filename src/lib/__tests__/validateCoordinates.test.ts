import { validateCoordinates } from '../validateCoordinates';

describe('validateCoordinates', () => {
    describe('valid coordinates', () => {
        it('should return true for valid coordinates', () => {
            expect(validateCoordinates(0, 0)).toBe(true);
            expect(validateCoordinates(45.5, -122.6)).toBe(true);
            expect(validateCoordinates(-33.8688, 151.2093)).toBe(true);
        });

        it('should accept boundary values', () => {
            expect(validateCoordinates(90, 180)).toBe(true);
            expect(validateCoordinates(-90, -180)).toBe(true);
            expect(validateCoordinates(90, -180)).toBe(true);
            expect(validateCoordinates(-90, 180)).toBe(true);
        });

        it('should accept coordinates at equator and prime meridian', () => {
            expect(validateCoordinates(0, 0)).toBe(true);
            expect(validateCoordinates(0, 100)).toBe(true);
            expect(validateCoordinates(50, 0)).toBe(true);
        });
    });

    describe('invalid latitude', () => {
        it('should return false for latitude above 90', () => {
            expect(validateCoordinates(90.1, 0)).toBe(false);
            expect(validateCoordinates(91, 0)).toBe(false);
            expect(validateCoordinates(100, 0)).toBe(false);
        });

        it('should return false for latitude below -90', () => {
            expect(validateCoordinates(-90.1, 0)).toBe(false);
            expect(validateCoordinates(-91, 0)).toBe(false);
            expect(validateCoordinates(-100, 0)).toBe(false);
        });
    });

    describe('invalid longitude', () => {
        it('should return false for longitude above 180', () => {
            expect(validateCoordinates(0, 180.1)).toBe(false);
            expect(validateCoordinates(0, 181)).toBe(false);
            expect(validateCoordinates(0, 200)).toBe(false);
        });

        it('should return false for longitude below -180', () => {
            expect(validateCoordinates(0, -180.1)).toBe(false);
            expect(validateCoordinates(0, -181)).toBe(false);
            expect(validateCoordinates(0, -200)).toBe(false);
        });
    });

    describe('NaN values', () => {
        it('should return false for NaN latitude', () => {
            expect(validateCoordinates(NaN, 0)).toBe(false);
        });

        it('should return false for NaN longitude', () => {
            expect(validateCoordinates(0, NaN)).toBe(false);
        });

        it('should return false for both NaN values', () => {
            expect(validateCoordinates(NaN, NaN)).toBe(false);
        });
    });

    describe('real-world coordinates', () => {
        it('should validate New York City coordinates', () => {
            expect(validateCoordinates(40.7128, -74.0060)).toBe(true);
        });

        it('should validate Tokyo coordinates', () => {
            expect(validateCoordinates(35.6762, 139.6503)).toBe(true);
        });

        it('should validate Sydney coordinates', () => {
            expect(validateCoordinates(-33.8688, 151.2093)).toBe(true);
        });

        it('should validate London coordinates', () => {
            expect(validateCoordinates(51.5074, -0.1278)).toBe(true);
        });

        it('should validate North Pole', () => {
            expect(validateCoordinates(90, 0)).toBe(true);
        });

        it('should validate South Pole', () => {
            expect(validateCoordinates(-90, 0)).toBe(true);
        });
    });

    describe('edge cases', () => {
        it('should handle decimal precision', () => {
            expect(validateCoordinates(89.9999, 179.9999)).toBe(true);
            expect(validateCoordinates(-89.9999, -179.9999)).toBe(true);
        });

        it('should reject coordinates just outside boundaries', () => {
            expect(validateCoordinates(90.0001, 0)).toBe(false);
            expect(validateCoordinates(-90.0001, 0)).toBe(false);
            expect(validateCoordinates(0, 180.0001)).toBe(false);
            expect(validateCoordinates(0, -180.0001)).toBe(false);
        });
    });
});
