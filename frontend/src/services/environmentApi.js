import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const getEnvironment = async (lat, lon) => {
  const response = await axios.get(
    `${API}/environment?lat=${lat}&lon=${lon}`
  );

  return response.data;
};