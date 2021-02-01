import { api } from "./apiService";

export async function Login(username: string, password: string) {
  const { data } = await api.post("/login", { username, password });
  return data.payload;
}
