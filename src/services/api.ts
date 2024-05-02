import axios from "axios";

const baseURL = "https://itunes.apple.com";

export const fetchFromAPI = async (url: string) => {
  const fullUrl = `${baseURL}${url}`;
  const response = await axios.get(fullUrl);
  return response.data;
};
