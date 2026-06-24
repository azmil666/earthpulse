import axios from "axios";

const API = "http://localhost:5000/api/environment";

export const getEnvironment = async (
  lat,
  lon
) => {
  const response = await axios.get(
    `${API}?lat=${lat}&lon=${lon}`
  );

  return response.data;
};