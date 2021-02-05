import axios from "axios";

import * as auth from "./auth";
import * as user from "./user";
import * as mixtape from "./mixtape";
import * as tournament from "./tournament";

export const apiBaseUrl =
  process.env.REACT_APP_API_URL || "http://localhost:3001";
export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000,
  responseType: "json",
  withCredentials: true,
});

export default { auth, user, mixtape, tournament };
