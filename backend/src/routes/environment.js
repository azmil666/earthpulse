const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const latitude = req.query.lat;
    const longitude = req.query.lon;

    if (!latitude || !longitude) {
      return res.status(400).json({
        error: "Latitude and longitude required",
      });
    }

    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`
    );

    const current = weather.data.current;

    res.json({
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      rainfall: current.precipitation,

      latitude,
      longitude,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch environmental data",
    });
  }
});

module.exports = router;