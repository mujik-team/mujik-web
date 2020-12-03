import { api } from "./api";
import { toast } from "react-toastify";

export async function register(userDetails: any) {
  const { data } = await api.post("/user", userDetails);

  if (data?.result === "OK") {
    toast.success("🎉 Successfully signed up!");
    return data.payload.user;
  } else {
    toast.dark("🤔 Please check input.", { position: "bottom-left" });
    return null;
  }
}

export async function updateUserProfile(username: string, profile: any) {
  const { data } = await api.put(`/user/${username}`, { profile });

  if (data.result === "OK") {
    toast.dark("Updated user profile.");
    return data.payload.user;
  } else {
    toast.warning("Unable to update user details");
    return null;
  }
}

export async function followUser(toFollow: string, follow: boolean) {
  const { data } = await api.post(`/user/follow`, { toFollow, follow });

  if (data.result === "OK") {
    toast.dark("Successfully followed/unfollowed");
  }
}

export async function getUser(username: string) {
  const { data } = await api.get(`/user/${username}`);

  return data.payload.user;
}
