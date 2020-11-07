import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3001",
  timeout: 8000,
  responseType: "json",
  validateStatus: null,
  withCredentials: true,
});
