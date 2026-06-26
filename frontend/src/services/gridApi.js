import { getEnvironment } from "./environmentApi";

export async function fetchGridEnvironment(gridPoints) {
  try {
    const results = await Promise.all(
      gridPoints.map(async (point) => {
        const data = await getEnvironment(point.lat, point.lon);

        return {
          lat: point.lat,
          lon: point.lon,

          temperature: data.temperature || data.current?.temperature || 0,
          humidity: data.humidity || data.current?.humidity || 0,
          rainfall: data.rainfall || data.current?.rainfall || 0,
          aqi: data.aqi || data.current?.aqi || 50,
          riskScore: data.riskScore || data.current?.riskScore || 30,
        };
      })
    );

    console.log("FETCHED GRID:", results);

    return results;
  } catch (error) {
    console.error("Grid fetch failed:", error);
    return [];
  }
}