import { api } from "./apiService";

export async function Login(username: string, password: string) {
  const { data } = await api.post("/auth/login", { username, password });
  return data.payload;
}
