function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    61: "Rain",
    71: "Snow",
    95: "Thunderstorm",
  };

  return descriptions[code] || "Unknown";
}

module.exports = getWeatherDescription;