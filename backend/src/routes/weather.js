const express = require("express");
const axios = require("axios");
const getWeatherDescription = require("../utils/weatherCodes");

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const geoResponse = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    if (!geoResponse.data.results) {
      return res.status(404).json({
        error: "City not found",
      });
    }

    const location = geoResponse.data.results[0];

    const weatherResponse = await axios.get(
`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
);

    res.json({
  city: location.name,
  country: location.country,
  temperature: weatherResponse.data.current.temperature_2m,
  humidity: weatherResponse.data.current.relative_humidity_2m,
  windSpeed: weatherResponse.data.current.wind_speed_10m,
  weather:
  getWeatherDescription(
    weatherResponse.data.current.weather_code
  ),
});

  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;