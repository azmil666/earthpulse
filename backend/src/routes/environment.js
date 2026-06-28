const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const latitude = req.query.lat;
  const longitude = req.query.lon;

  if (!latitude || !longitude) {
    return res.status(400).json({
      error: "Latitude and longitude required",
    });
  }

  try {
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`,
      {
        timeout: 10000, // prevents hanging
      }
    );

    const current = weather?.data?.current || {};

    res.json({
      temperature: current.temperature_2m ?? null,
      humidity: current.relative_humidity_2m ?? null,
      windSpeed: current.wind_speed_10m ?? null,
      rainfall: current.precipitation ?? null,
      aqi: Math.floor(Math.random() * 100), // temp placeholder
      riskScore: Math.floor(Math.random() * 100), // temp placeholder
      alerts: [],

      latitude,
      longitude,
    });
  } catch (err) {
    console.error("Environment API Error:");
console.error("Message:", err.message);
console.error("Status:", err.response?.status);
console.error("Data:", err.response?.data);

    // fallback response instead of crashing
    res.json({
      temperature: null,
      humidity: null,
      windSpeed: null,
      rainfall: null,
      aqi: null,
      riskScore: null,
      alerts: [],

      latitude,
      longitude,
    });
  }
});

module.exports = router;