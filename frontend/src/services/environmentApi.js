import axios from "axios";

const API = "http://localhost:5000/api/environment";

export const getEnvironment = async (city) => {
  const response = await axios.get(
    `${API}/${city}`
  );

  return response.data;
};