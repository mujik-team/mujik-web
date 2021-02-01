import { ParseUserFromJSON } from "../../model/User";
import { api } from "../api";

export async function RegisterUser(userDetails: RegisterUserDTO) {
  const { data } = await api.post("/user", userDetails);

  const user = ParseUserFromJSON(data.payload);
  return user;
}

export async function GetUser(username: string) {
  const { data } = await api.get(`/user/${username}`);

  const user = ParseUserFromJSON(data.payload);
  return user;
}

export async function UpdateUserProfile(userProfile: UserProfileDTO) {
  const { data } = await api.put("/user", userProfile);
}

export async function FollowUser(usernameToFollow: string, toFollow: boolean) {
  const { data } = await api.post(`/user/${usernameToFollow}`, null, {
    params: { follow: toFollow },
  });
}

interface RegisterUserDTO {
  username: string;
  email: string;
  pass: string;
  profile: {
    bio: string;
  };
}

interface UserProfileDTO {
  bio: string;
}
