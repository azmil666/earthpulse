// EarthPulse — Location dataset
// Replace mock fields with live API data later. Shape kept stable for drop-in.

export const LOCATIONS = [
  {
    id: "kochi",
    name: "Kochi",
    coords: [9.9312, 76.2673],
    zoom: 12,
    current: {
      temperature: 34.2,
      humidity: 78,
      windSpeed: 14,
      condition: "Hazy Sunshine",
      aqi: 78,
      rainfall: 12,
      riskScore: 45,
    },
    alerts: [
      { id: "a1", type: "heat", title: "Heat Advisory", detail: "Feels-like temperature exceeds 38°C between 12:00–15:00.", severity: "moderate" },
      { id: "a2", type: "aqi", title: "AQI Alert", detail: "PM2.5 levels trending upward over the last 6 hours.", severity: "moderate" },
    ],
    insights: [
      { id: "i1", label: "AQI increased 12% vs. yesterday", trend: "up" },
      { id: "i2", label: "Surface temperature rising steadily", trend: "up" },
      { id: "i3", label: "Rain expected within 24h", trend: "neutral" },
    ],
  },
  {
    id: "kakkanad",
    name: "Kakkanad",
    coords: [10.0167, 76.3489],
    zoom: 13,
    current: {
      temperature: 33.6,
      humidity: 74,
      windSpeed: 11,
      condition: "Partly Cloudy",
      aqi: 84,
      rainfall: 4,
      riskScore: 52,
    },
    alerts: [
      { id: "a1", type: "aqi", title: "AQI Alert", detail: "Industrial corridor emissions elevated through the afternoon.", severity: "high" },
    ],
    insights: [
      { id: "i1", label: "Vegetation index stable week-over-week", trend: "neutral" },
      { id: "i2", label: "Traffic-linked AQI spike near tech corridor", trend: "up" },
    ],
  },
  {
    id: "aluva",
    name: "Aluva",
    coords: [10.1081, 76.3517],
    zoom: 13,
    current: {
      temperature: 32.9,
      humidity: 81,
      windSpeed: 9,
      condition: "Overcast",
      aqi: 61,
      rainfall: 22,
      riskScore: 58,
    },
    alerts: [
      { id: "a1", type: "rain", title: "Heavy Rain Warning", detail: "River basin levels rising; localized flooding possible near low-lying areas.", severity: "high" },
      { id: "a2", type: "flood", title: "Flood Risk Elevated", detail: "Periyar river discharge above seasonal average.", severity: "severe" },
    ],
    insights: [
      { id: "i1", label: "River discharge up 18% this week", trend: "up" },
      { id: "i2", label: "Rainfall accumulation above monthly norm", trend: "up" },
    ],
  },
  {
    id: "fort-kochi",
    name: "Fort Kochi",
    coords: [9.9658, 76.2424],
    zoom: 15,
    current: {
      temperature: 31.8,
      humidity: 85,
      windSpeed: 18,
      condition: "Coastal Breeze",
      aqi: 52,
      rainfall: 8,
      riskScore: 33,
    },
    alerts: [
      { id: "a1", type: "wind", title: "Strong Wind Advisory", detail: "Coastal gusts exceeding 30km/h expected near the waterfront.", severity: "low" },
    ],
    insights: [
      { id: "i1", label: "Air quality improved 9% vs. last week", trend: "down" },
      { id: "i2", label: "Coastal humidity holding steady", trend: "neutral" },
    ],
  },
  {
    id: "thrippunithura",
    name: "Thrippunithura",
    coords: [9.9447, 76.3489],
    zoom: 13,
    current: {
      temperature: 33.1,
      humidity: 76,
      windSpeed: 10,
      condition: "Clear Sky",
      aqi: 69,
      rainfall: 6,
      riskScore: 41,
    },
    alerts: [
      { id: "a1", type: "heat", title: "Heat Advisory", detail: "Dry spell continues; ground-level temperatures climbing.", severity: "moderate" },
    ],
    insights: [
      { id: "i1", label: "Vegetation cover slightly declining", trend: "down" },
      { id: "i2", label: "Temperature rising 1.4°C above seasonal avg", trend: "up" },
    ],
  },
  {
    id: "perumbavoor",
    name: "Perumbavoor",
    coords: [10.1107, 76.4756],
    zoom: 13,
    current: {
      temperature: 34.7,
      humidity: 70,
      windSpeed: 8,
      condition: "Sunny",
      aqi: 91,
      rainfall: 2,
      riskScore: 63,
    },
    alerts: [
      { id: "a1", type: "aqi", title: "AQI Alert", detail: "Timber and plywood processing zones contributing to elevated particulate levels.", severity: "high" },
      { id: "a2", type: "heat", title: "Heat Warning", detail: "Sustained high temperatures with low cloud cover.", severity: "high" },
    ],
    insights: [
      { id: "i1", label: "AQI increased 12% vs. yesterday", trend: "up" },
      { id: "i2", label: "Rainfall deficit for the third consecutive week", trend: "down" },
    ],
  },
  {
    id: "muvattupuzha",
    name: "Muvattupuzha",
    coords: [9.9776, 76.5778],
    zoom: 13,
    current: {
      temperature: 32.4,
      humidity: 79,
      windSpeed: 12,
      condition: "Light Showers",
      aqi: 48,
      rainfall: 28,
      riskScore: 47,
    },
    alerts: [
      { id: "a1", type: "rain", title: "Heavy Rain Warning", detail: "Continued rainfall expected to raise river levels overnight.", severity: "moderate" },
    ],
    insights: [
      { id: "i1", label: "Vegetation index improving with seasonal rain", trend: "up" },
      { id: "i2", label: "Rain expected to continue through tomorrow", trend: "neutral" },
    ],
  },
];

export const LAYERS = [
  { id: "heat", label: "Heat Map", icon: "flame" },
  { id: "rainfall", label: "Rainfall", icon: "cloud-rain" },
  { id: "vegetation", label: "Vegetation", icon: "leaf" },
  { id: "airquality", label: "Air Quality", icon: "wind" },
  { id: "flood", label: "Flood Risk", icon: "waves" },
];

export const LEGENDS = {
  heat: {
    title: "Surface Temperature",
    unit: "°C",
    stops: [
      { color: "#3B82F6", label: "< 24°" },
      { color: "#FACC15", label: "24–30°" },
      { color: "#FB923C", label: "30–36°" },
      { color: "#EF4444", label: "> 36°" },
    ],
  },
  rainfall: {
    title: "Rainfall Intensity",
    unit: "mm",
    stops: [
      { color: "#BFDBFE", label: "0–5mm" },
      { color: "#60A5FA", label: "5–20mm" },
      { color: "#1D4ED8", label: "> 20mm" },
    ],
  },
  vegetation: {
    title: "Vegetation Index",
    unit: "NDVI",
    stops: [
      { color: "#92400E", label: "Bare Soil" },
      { color: "#A3E635", label: "Sparse Cover" },
      { color: "#15803D", label: "Dense Cover" },
    ],
  },
  airquality: {
    title: "Air Quality Index",
    unit: "AQI",
    stops: [
      { color: "#22C55E", label: "0–50 Good" },
      { color: "#EAB308", label: "51–100 Moderate" },
      { color: "#F97316", label: "101–150 Poor" },
      { color: "#EF4444", label: "151–200 Severe" },
      { color: "#A855F7", label: "200+ Hazardous" },
    ],
  },
  flood: {
    title: "Flood Risk Zones",
    unit: "Risk",
    stops: [
      { color: "#1E3A8A", label: "Low" },
      { color: "#3B82F6", label: "Moderate" },
      { color: "#8B5CF6", label: "High" },
    ],
  },
};

export function riskLevel(score) {
  if (score < 30) return { label: "Low", color: "#22C55E" };
  if (score < 55) return { label: "Moderate", color: "#EAB308" };
  if (score < 80) return { label: "High", color: "#F97316" };
  return { label: "Severe", color: "#EF4444" };
}
