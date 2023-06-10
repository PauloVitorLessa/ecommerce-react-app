import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const CardApi = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7",
});
