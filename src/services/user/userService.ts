import { api } from "../api";
import { toast } from "react-toastify";

export async function register(userDetails: any) {
  const { data } = await api.post("/user", userDetails);

  if (data.result === "OK") {
    toast.success("🎉 Successfully signed up!");
    return data.payload.user;
  } else {
    toast.dark("🤔 Please check input.", { position: "bottom-left" });
    return null;
  }
}
