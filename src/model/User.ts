export class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public profile: Profile = new Profile()
  ) {}
}

class Profile {
  bio: string = "";
  level: number = 1;
  coins: number = 0;

  favGenre = new Array<string>();
  favArtist = new Array<string>();
  mixtapes = new Array<string>();

  totalFollowers: number = 0;
  totalFollowing: number = 0;
  followers = new Array<string>();
  following = new Array<string>();

  tournamentsJoined = new Array<string>();
  tournamentsCreated = new Array<string>();
}