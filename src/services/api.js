import axios from "axios";

export const ApiLocal = axios.create({
  baseURL: "http://localhost:8080/api",
});
export const Api = axios.create({
  baseURL: "https://api-restful-trabalho-final-production.up.railway.app/api",
});

export const Cep = axios.create({
  baseURL: "https://cdn.apicep.com/file/apicep",
});
