import axios from "axios";

import * as auth from "./auth";
import * as user from "./user";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  timeout: 8000,
  responseType: "json",
  withCredentials: true,
});

export default { auth, user };
