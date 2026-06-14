const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const geo = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    if (!geo.data.results?.length) {
      return res.status(404).json({
        error: "Location not found",
      });
    }

    const { latitude, longitude, country } =
      geo.data.results[0];

    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`
    );

    const current = weather.data.current;

    res.json({
      city,
      country,

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