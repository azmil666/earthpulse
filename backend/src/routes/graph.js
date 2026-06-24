const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/trends", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );

    res.json({
      temperatureTrend: weatherResponse.data.hourly.temperature_2m,
      humidityTrend: weatherResponse.data.hourly.relative_humidity_2m,
      windTrend: weatherResponse.data.hourly.wind_speed_10m,
      time: weatherResponse.data.hourly.time,
    });

  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;