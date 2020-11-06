import { api } from "../api";
import { toast } from "react-toastify";

export async function login(username: string, password: string) {
  try {
    const { data } = await api.post("/login", { username, password });

    toast.dark(`👋 Welcome ${username}!`);
    return data.payload.user;
  } catch (err) {
    toast.error(`🤔 Please check credentials.`);
    return null;
  }
}

export async function logout() {
  const { data } = await api.post("/logout");

  toast.dark(data.message);

  return true;
}
