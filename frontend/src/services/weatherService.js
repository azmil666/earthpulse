import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const getWeather = async (city) => {
  const response = await axios.get(
    `${API}/weather/${city}`
  );

  return response.data;
};