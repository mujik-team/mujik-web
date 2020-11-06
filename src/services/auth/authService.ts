import { api } from "../api";
import { toast } from "react-toastify";

export async function login(username: string, password: string) {
  const { data } = await api.post("/login", { username, password });

  if (data?.result === "OK") {
    toast.dark(`👋 Welcome ${username}!`);
    return data.payload.user;
  } else {
    toast.error(`🤔 Please check credentials.`);
    return null;
  }
}

export async function logout() {
  const { data } = await api.post("/logout");

  toast.dark(data.message);

  return true;
}
