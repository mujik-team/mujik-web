import { api } from "../api";
import { toast } from "react-toastify";

export function checkIfLoggedIn() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  return username && password;
}

export async function login(username: string, password: string) {
  const { data } = await api.post("/login", { username, password });

  if (data?.result === "OK") {
    toast.dark(`👋 Welcome ${username}!`);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    return data.payload.user;
  } else {
    toast.error(`🤔 Please check credentials.`);
    return null;
  }
}

export async function reset(
  username: string,
  newPassword: string,
  resetCode: string
) {
  const { data } = await api.post("/reset", {
    username,
    newPassword,
    resetCode,
  });

  if (data.result === "OK") {
    toast.success(`Successfully reset credentials`);
    return true;
  } else {
    toast.warning(data.message);
    return false;
  }
}

export async function logout() {
  const { data } = await api.post("/logout");

  toast.dark(data.message);
  localStorage.removeItem("username");
  localStorage.removeItem("password");

  const token = localStorage.getItem("spotify_refresh_token");
  if (token) {
    console.log("Still exists", token);
  }
  return true;
}
