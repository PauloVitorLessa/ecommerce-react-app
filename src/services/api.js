import axios from "axios";

export const Api = axios.create({
  baseURL: "https://api-restful-trabalho-final-production.up.railway.app/api",
});
