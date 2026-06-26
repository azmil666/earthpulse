export function generateErnakulamGrid() {
  const points = [];

  const south = 9.70;
  const north = 10.25;
  const west = 76.10;
  const east = 76.65;

  const step = 0.03;

  for (let lat = south; lat <= north; lat += step) {
    for (let lon = west; lon <= east; lon += step) {
      points.push({
        lat: Number(lat.toFixed(4)),
        lon: Number(lon.toFixed(4)),
      });
    }
  }

  return points;
}