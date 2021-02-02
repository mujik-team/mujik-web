import { MapToObject, ObjectToMap } from "../services/util";

export interface User {
  username: string;
  email: string;
  pass: string;
  profile: {
    bio: string;
    level: number;
    coins: number;
    mixtapes: Map<string, boolean>;
    mixtapesFollowing: Map<string, boolean>;
    followers: Map<string, boolean>;
    following: Map<string, boolean>;
  };
}

export function ParseUserFromJSON(json: any): User {
  // Most of the types map fine.
  const user: User = json;

  // Maps need to converted.
  user.profile.mixtapes = ObjectToMap(user.profile.mixtapes);
  user.profile.mixtapesFollowing = ObjectToMap(user.profile.mixtapesFollowing);
  user.profile.followers = ObjectToMap(json.profile.followers);
  user.profile.following = ObjectToMap(json.profile.following);

  return user;
}

export function ConvertUserToJSON(user: User): any {
  const json: any = { ...user };

  json.profile.mixtapes = MapToObject(json.profile.mixtapes);
  json.profile.mixtapesFollowing = MapToObject(json.profile.mixtapesFollowing);
  json.profile.followers = MapToObject(json.profile.followers);
  json.profile.following = MapToObject(json.profile.following);

  return json;
}
