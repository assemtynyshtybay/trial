import axios from "axios";

const apiURL = "https://alphaedu.portfolio-adilzhexenov.kz";
const productURL = "https://fakestoreapi.com";
export const axiosInstance = await axios.create({
  baseURL: apiURL,
  timeout: 2000,
});

export const axiosShopInstance = await axios.create({
  baseURL: productURL,
  timeout: 2000,
});
