export function validateCoordinates(lat: number, lon: number): boolean {
    if (isNaN(lat) || isNaN(lon)) {
        return false;
    }
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return false;
    }
    return true;
}