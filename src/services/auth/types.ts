export type AuthState = {
  isLoggedIn: boolean;
  currentUser?: any;
  update(): any;
  login: (u: string, p: string) => any;
  logout: () => any;
};
