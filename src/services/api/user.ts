import { ConvertUserToJSON, ParseUserFromJSON, User } from "../../model/User";
import { api } from "./apiService";

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

export async function UpdateUser(username: string, user: User) {
  const userObj = ConvertUserToJSON(user);

  await api.put(`/user/${username}`, userObj);
}

export async function FollowUser(usernameToFollow: string, toFollow: boolean) {
  const { data } = await api.post(`/user/${usernameToFollow}`, null, {
    params: { follow: toFollow },
  });
}

export async function UploadUserProfilePicture(image: Blob) {
  const formData = new FormData();
  formData.append("avatar", image);
  await api.post(`/user/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function GetFeaturedUsers() {
  const { data } = await api.get("/user/featured");
  const users: User[] = data.payload.map((u: any) => ParseUserFromJSON(u));
  return users;
}

interface RegisterUserDTO {
  username: string;
  email: string;
  pass: string;
  profile: {
    bio: string;
  };
}
