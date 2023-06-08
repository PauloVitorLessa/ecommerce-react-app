import axios from "axios";

export const Api = axios.create({
  baseURL: "https://api-restful-trabalho-final-production.up.railway.app/api",
});

export const CardApi = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7",
});
